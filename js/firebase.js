// Rhoda Traders Firebase Configuration

// Import the Firebase modules
import { initializeApp } from \"https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js\";
import { getAnalytics } from \"https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js\";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    onAuthStateChanged,
    updateProfile
} from \"https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js\";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    doc, 
    query, 
    where, 
    orderBy, 
    serverTimestamp 
} from \"https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js\";
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from \"https://www.gstatic.com/firebasejs/11.5.0/firebase-storage.js\";

// Firebase configuration
const firebaseConfig = {
    apiKey: \"AIzaSyBCF-MkWe8JhkXKNoKLqzWAZxZVHMukO-c\",
    authDomain: \"rhoda-traders.firebaseapp.com\",
    projectId: \"rhoda-traders\",
    storageBucket: \"rhoda-traders.firebasestorage.app\",
    messagingSenderId: \"88738705806\",
    appId: \"1:88738705806:web:0cbbb1be4ce51daa7334df\",
    measurementId: \"G-44T210GQ6S\"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth functions
const registerUser = async (email, password, userData) => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Set display name
        await updateProfile(user, {
            displayName: `${userData.firstName} ${userData.lastName}`
        });
        
        // Store additional user data in Firestore
        userData.uid = user.uid;
        userData.createdAt = serverTimestamp();
        userData.status = 'pending'; // Initial status is pending admin approval
        userData.role = 'user';
        
        // Add user data to Firestore
        const userRef = await addDoc(collection(db, 'users'), userData);
        
        // Upload resume if provided
        if (userData.resume) {
            const resumeRef = ref(storage, `resumes/${user.uid}/${userData.resume.name}`);
            await uploadBytes(resumeRef, userData.resume);
            const resumeUrl = await getDownloadURL(resumeRef);
            
            // Update user document with resume URL
            await updateDoc(doc(db, 'users', userRef.id), {
                resumeUrl: resumeUrl
            });
        }
        
        return { success: true, userId: user.uid };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get user data from Firestore
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error('User data not found');
        }
        
        const userData = querySnapshot.docs[0].data();
        
        // Check if user is approved
        if (userData.status !== 'approved' && userData.role !== 'admin') {
            await signOut(auth);
            return { 
                success: false, 
                error: 'Your account is pending approval. Please wait for an administrator to approve your account.'
            };
        }
        
        return { success: true, user: userData };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error logging out:', error);
        return { success: false, error: error.message };
    }
};

const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        console.error('Error resetting password:', error);
        return { success: false, error: error.message };
    }
};

const checkAuthState = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            try {
                const q = query(collection(db, 'users'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    callback({ loggedIn: true, user: userData });
                } else {
                    callback({ loggedIn: true, user: { uid: user.uid, email: user.email } });
                }
            } catch (error) {
                console.error('Error getting user data:', error);
                callback({ loggedIn: true, user: { uid: user.uid, email: user.email } });
            }
        } else {
            // User is signed out
            callback({ loggedIn: false });
        }
    });
};

// Firestore functions
const submitApplication = async (applicationData) => {
    try {
        applicationData.createdAt = serverTimestamp();
        applicationData.status = 'pending';
        
        const docRef = await addDoc(collection(db, 'applications'), applicationData);
        return { success: true, applicationId: docRef.id };
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: error.message };
    }
};

const getApplications = async (status = null) => {
    try {
        let q;
        if (status) {
            q = query(
                collection(db, 'applications'), 
                where('status', '==', status),
                orderBy('createdAt', 'desc')
            );
        } else {
            q = query(
                collection(db, 'applications'),
                orderBy('createdAt', 'desc')
            );
        }
        
        const querySnapshot = await getDocs(q);
        const applications = [];
        
        querySnapshot.forEach((doc) => {
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, applications };
    } catch (error) {
        console.error('Error getting applications:', error);
        return { success: false, error: error.message };
    }
};

const updateApplicationStatus = async (applicationId, status) => {
    try {
        await updateDoc(doc(db, 'applications', applicationId), {
            status: status,
            updatedAt: serverTimestamp()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error updating application status:', error);
        return { success: false, error: error.message };
    }
};

const submitReport = async (reportData) => {
    try {
        reportData.createdAt = serverTimestamp();
        reportData.status = 'submitted';
        
        const docRef = await addDoc(collection(db, 'reports'), reportData);
        return { success: true, reportId: docRef.id };
    } catch (error) {
        console.error('Error submitting report:', error);
        return { success: false, error: error.message };
    }
};

const getReports = async (userId = null) => {
    try {
        let q;
        if (userId) {
            q = query(
                collection(db, 'reports'), 
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );
        } else {
            q = query(
                collection(db, 'reports'),
                orderBy('createdAt', 'desc')
            );
        }
        
        const querySnapshot = await getDocs(q);
        const reports = [];
        
        querySnapshot.forEach((doc) => {
            reports.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, reports };
    } catch (error) {
        console.error('Error getting reports:', error);
        return { success: false, error: error.message };
    }
};

// Export the functions
export {
    auth,
    db,
    storage,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    checkAuthState,
    submitApplication,
    getApplications,
    updateApplicationStatus,
    submitReport,
    getReports
};