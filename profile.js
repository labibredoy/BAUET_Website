// Get Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Function to update profile information
async function updateProfileInfo(userData) {
    console.log("Updating profile with data:", userData);
    
    // Update profile header
    document.getElementById('profileName').textContent = userData.fullName || 'Not provided';
    document.getElementById('profileEmail').textContent = userData.email || 'Not provided';
    document.getElementById('profileId').textContent = userData.studentId || 'Not provided';
    document.getElementById('profileDepartment').textContent = userData.department || 'Not provided';

    // Update profile picture if exists
    const profileAvatar = document.getElementById('profileAvatar');
    if (userData.profilePicture) {
        profileAvatar.src = userData.profilePicture;
        profileAvatar.style.display = 'block';
    } else {
        profileAvatar.src = 'L.png'; // Default image
        profileAvatar.style.display = 'block';
    }

    // Update academic info in sidebar
    document.getElementById('studentIdValue').textContent = userData.studentId || 'Not provided';
    document.getElementById('departmentValue').textContent = userData.department || 'Not provided';
    document.getElementById('emailValue').textContent = userData.email || 'Not provided';
    
    // Update academic info in main section
    document.getElementById('departmentValue2').textContent = userData.department || 'Not provided';

    // Update edit form fields
    document.getElementById('editFullName').value = userData.fullName || '';
    document.getElementById('editStudentId').value = userData.studentId || '';
    document.getElementById('editDepartment').value = userData.department || '';
    document.getElementById('editEmail').value = userData.email || '';
}

// Function to handle profile picture upload
async function handleProfilePictureUpload(file, userId) {
    try {
        // Show loading state
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.style.opacity = '0.5';

        // Create a unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `${userId}_${Date.now()}.${fileExtension}`;
        
        // Create storage reference
        const storageRef = storage.ref();
        const profilePicRef = storageRef.child(`profile_pictures/${fileName}`);
        
        // Upload file
        const snapshot = await profilePicRef.put(file);
        console.log('File uploaded successfully');
        
        // Get download URL
        const downloadURL = await snapshot.ref.getDownloadURL();
        console.log('Download URL:', downloadURL);
        
        // Update user document with new profile picture URL
        await db.collection("users").doc(userId).update({
            profilePicture: downloadURL
        });
        console.log('User document updated with new profile picture URL');

        // Update profile picture display
        profileAvatar.src = downloadURL;
        profileAvatar.style.opacity = '1';
        
        console.log("Profile picture uploaded and displayed successfully");
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Error uploading profile picture. Please try again.");
        // Reset profile picture display
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.style.opacity = '1';
    }
}

// Function to handle profile update
async function handleProfileUpdate(userId, formData) {
    try {
        await db.collection("users").doc(userId).update({
            fullName: formData.get('fullName'),
            studentId: formData.get('studentId'),
            department: formData.get('department'),
            email: formData.get('email')
        });

        // Refresh profile data
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
            updateProfileInfo(userDoc.data());
        }

        // Close modal
        document.getElementById('editProfileModal').style.display = 'none';
        
        console.log("Profile updated successfully");
        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile. Please try again.");
    }
}

// Logout function
async function logout() {
    try {
        await auth.signOut();
        localStorage.removeItem('loggedInUserId');
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, setting up event listeners");
    
    // Add event listener to logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        console.log("Logout button found");
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Add event listener to nav logout button
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    if (navLogoutBtn) {
        console.log("Nav logout button found");
        navLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Add event listener to profile picture upload
    const profilePicUpload = document.getElementById('profilePicUpload');
    if (profilePicUpload) {
        profilePicUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const userId = auth.currentUser?.uid;
                if (userId) {
                    handleProfilePictureUpload(file, userId);
                }
            }
        });
    }

    // Add event listener to edit profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModal = document.querySelector('.close-modal');
    const editProfileForm = document.getElementById('editProfileForm');

    if (editProfileBtn && editProfileModal) {
        editProfileBtn.addEventListener('click', () => {
            editProfileModal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            editProfileModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === editProfileModal) {
                editProfileModal.style.display = 'none';
            }
        });

        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = auth.currentUser?.uid;
            if (userId) {
                handleProfileUpdate(userId, new FormData(editProfileForm));
            }
        });
    }
});

// Check authentication state and load profile
auth.onAuthStateChanged(async (user) => {
    console.log("Auth state changed:", user ? "User logged in" : "No user");
    
    if (user) {
        try {
            console.log("Fetching user data for:", user.uid);
            // Get user data from Firestore
            const userDoc = await db.collection("users").doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log("User data found:", userData);
                updateProfileInfo(userData);
            } else {
                console.log("No user data found in Firestore");
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // User is not logged in, redirect to login page
        console.log("User not logged in, redirecting to login page");
        window.location.href = 'login.html';
    }
}); 