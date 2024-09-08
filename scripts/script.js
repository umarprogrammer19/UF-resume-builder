"use strict";
// Regular expressions for validation
const strRegex = /^[a-zA-Z\s]*$/; // Letters and spaces only
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
const phoneRegex = /^[0-9]{10,15}$/; // Phone numbers with 10 to 15 digits
// Form elements
const mainForm = document.getElementById('cv-form');
const firstnameElem = mainForm.firstname;
const middlenameElem = mainForm.middlename;
const lastnameElem = mainForm.lastname;
const imageElem = mainForm.image;
const designationElem = mainForm.designation;
const addressElem = mainForm.address;
const emailElem = mainForm.email;
const phonenoElem = mainForm.phoneno;
const summaryElem = mainForm.summary;
// Display elements
const nameDsp = document.getElementById('fullname_dsp');
const imageDsp = document.getElementById('image_dsp');
const phonenoDsp = document.getElementById('phoneno_dsp');
const emailDsp = document.getElementById('email_dsp');
const addressDsp = document.getElementById('address_dsp');
const designationDsp = document.getElementById('designation_dsp');
const summaryDsp = document.getElementById('summary_dsp');
const projectsDsp = document.getElementById('projects_dsp');
const achievementsDsp = document.getElementById('achievements_dsp');
const skillsDsp = document.getElementById('skills_dsp');
const educationsDsp = document.getElementById('educations_dsp');
const experiencesDsp = document.getElementById('experiences_dsp');
// function to show error messages
const showError = (elem, message) => {
    const errorElem = elem.nextElementSibling;
    errorElem.textContent = message;
};
// function to hide error messages
const hideError = (elem) => {
    const errorElem = elem.nextElementSibling;
    errorElem.textContent = '';
};
// Validate inputs
const validateInput = (elem, regex, errorMessage) => {
    const value = elem.value.trim();
    if (!regex.test(value) || value.length === 0) {
        showError(elem, errorMessage);
    }
    else {
        hideError(elem);
    }
};
// Fetch values from multiple input elements
const fetchValues = (attributes, ...nodeLists) => {
    const results = [];
    for (let i = 0; i < nodeLists[0].length; i++) {
        const data = {};
        attributes.forEach((attr, index) => {
            data[attr] = nodeLists[index][i].value;
        });
        results.push(data);
    }
    return results;
};
// Get user inputs from the form
const getUserInputs = () => {
    // Query elements for different sections
    const achievementsTitleElem = document.querySelectorAll('.achieve_title');
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    const expTitleElem = document.querySelectorAll('.exp_title');
    const expOrganizationElem = document.querySelectorAll('.exp_organization');
    const expLocationElem = document.querySelectorAll('.exp_location');
    const expStartDateElem = document.querySelectorAll('.exp_start_date');
    const expEndDateElem = document.querySelectorAll('.exp_end_date');
    const expDescriptionElem = document.querySelectorAll('.exp_description');
    const eduSchoolElem = document.querySelectorAll('.edu_school');
    const eduDegreeElem = document.querySelectorAll('.edu_degree');
    const eduCityElem = document.querySelectorAll('.edu_city');
    const eduStartDateElem = document.querySelectorAll('.edu_start_date');
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    const eduDescriptionElem = document.querySelectorAll('.edu_description');
    const projTitleElem = document.querySelectorAll('.proj_title');
    const projLinkElem = document.querySelectorAll('.proj_link');
    const projDescriptionElem = document.querySelectorAll('.proj_description');
    const skillElem = document.querySelectorAll('.skill');
    // Attach event listeners for validation
    const attachValidationListeners = (elems, regex, errorMessage) => {
        elems.forEach(elem => elem.addEventListener('input', () => validateInput(elem, regex, errorMessage)));
    };
    attachValidationListeners([firstnameElem, middlenameElem, lastnameElem], strRegex, "Invalid name");
    attachValidationListeners([emailElem], emailRegex, "Invalid email");
    attachValidationListeners([phonenoElem], phoneRegex, "Invalid phone number");
    addressElem.addEventListener('input', () => hideError(addressElem)); // Address is optional
    // Return collected values
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
    };
};
// Display user data in the CV
const displayCV = (userData) => {
    nameDsp.innerText = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerText = userData.phoneno;
    emailDsp.innerText = userData.email;
    addressDsp.innerText = userData.address;
    designationDsp.innerText = userData.designation;
    summaryDsp.innerText = userData.summary;
    displayListData(userData.projects, projectsDsp);
    displayListData(userData.achievements, achievementsDsp);
    displayListData(userData.skills, skillsDsp);
    displayListData(userData.educations, educationsDsp);
    displayListData(userData.experiences, experiencesDsp);
};
// Show list data in the specified container
const displayListData = (listData, container) => {
    container.innerHTML = '';
    listData.forEach(item => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        Object.values(item).forEach(value => {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerText = value;
            itemElem.appendChild(subItemElem);
        });
        container.appendChild(itemElem);
    });
};
// Generate CV
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};
// Preview image
const previewImage = () => {
    const file = imageElem.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        imageDsp.src = reader.result;
    };
    reader.readAsDataURL(file);
};
// Print CV
const printCV = () => {
    window.print();
};
// Update form inputs based on the editable preview section
const updateFormFromPreview = () => {
    firstnameElem.value = nameDsp.innerText.split(' ')[0] || '';
    middlenameElem.value = ''; // Adjust as needed
    lastnameElem.value = nameDsp.innerText.split(' ')[2] || '';
    designationElem.value = designationDsp.innerText;
    addressElem.value = addressDsp.innerText;
    emailElem.value = emailDsp.innerText;
    phonenoElem.value = phonenoDsp.innerText;
    summaryElem.value = summaryDsp.innerText;
};
// Add event listeners to handle changes in the preview section
const addPreviewEditListeners = () => {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(elem => {
        elem.addEventListener('input', updateFormFromPreview);
    });
};
// Initialize event listeners after page load
window.addEventListener('DOMContentLoaded', addPreviewEditListeners);
// Event listeners for form interactions
document.getElementById('generate-btn').addEventListener('click', generateCV);
imageElem.addEventListener('change', previewImage);
document.getElementById('print-btn').addEventListener('click', printCV);
