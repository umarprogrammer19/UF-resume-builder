// Regular expressions for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // Letters and spaces only
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
const phoneRegex: RegExp = /^[0-9]{10,15}$/; // Phone numbers with 10 to 15 digits

// Form elements
const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const imageElem = mainForm.image as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLTextAreaElement;

// Display elements
const nameDsp = document.getElementById('fullname_dsp') as HTMLDivElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLDivElement;
const emailDsp = document.getElementById('email_dsp') as HTMLDivElement;
const addressDsp = document.getElementById('address_dsp') as HTMLDivElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLDivElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLDivElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLDivElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLDivElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLDivElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLDivElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLDivElement;

// function to show error messages
const showError = (elem: HTMLInputElement, message: string) => {
    const errorElem = elem.nextElementSibling as HTMLElement;
    errorElem.textContent = message;
};

// function to hide error messages
const hideError = (elem: HTMLInputElement) => {
    const errorElem = elem.nextElementSibling as HTMLElement;
    errorElem.textContent = '';
};

// Validate inputs
const validateInput = (elem: HTMLInputElement, regex: RegExp, errorMessage: string) => {
    const value = elem.value.trim();
    if (!regex.test(value) || value.length === 0) {
        showError(elem, errorMessage);
    } else {
        hideError(elem);
    }
};

// Fetch values from multiple input elements
const fetchValues = (attributes: string[], ...nodeLists: NodeListOf<HTMLInputElement>[]) => {
    const results: any[] = [];
    for (let i = 0; i < nodeLists[0].length; i++) {
        const data: { [key: string]: string } = {};
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
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>;
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>;
    const expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>;
    const expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>;
    const expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>;
    const expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>;
    const expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>;
    const expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLInputElement>;
    const eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>;
    const eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>;
    const eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>;
    const eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>;
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>;
    const eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLInputElement>;
    const projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>;
    const projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>;
    const projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLInputElement>;
    const skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    // Attach event listeners for validation
    const attachValidationListeners = (elems: HTMLInputElement[], regex: RegExp, errorMessage: string) => {
        elems.forEach(elem => elem.addEventListener('input', () => validateInput(elem, regex, errorMessage)));
    };

    attachValidationListeners([firstnameElem, middlenameElem, lastnameElem], strRegex, "Invalid name");
    attachValidationListeners([emailElem], emailRegex, "Invalid email");
    attachValidationListeners([phonenoElem], phoneRegex, "Invalid phone number");
    addressElem.addEventListener('input', () => hideError(addressElem as HTMLInputElement)); // Address is optional

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
const displayCV = (userData: any) => {
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
const displayListData = (listData: any[], container: HTMLElement) => {
    container.innerHTML = '';
    listData.forEach(item => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        Object.values(item).forEach(value => {
            const subItemElem: any = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerText = value;
            itemElem.appendChild(subItemElem);
        });
        container.appendChild(itemElem);
    });
};

// Function to generate a unique ID for the resume
const generateUniqueID = () => {
    return `resume_${Math.random().toString(36).substr(2, 9)}`;
};


// Generate CV
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};

// Preview image
const previewImage = () => {
    const file = imageElem.files![0];
    const reader = new FileReader();
    reader.onload = () => {
        imageDsp.src = reader.result as string;
    };
    reader.readAsDataURL(file);
};

// Print CV
const printCV = () => {
    window.print();
};

// Update form inputs based on the editable preview section
const updateFormFromPreview = () => {
    (firstnameElem as HTMLInputElement).value = nameDsp.innerText.split(' ')[0] || '';
    (middlenameElem as HTMLInputElement).value = ''; // Adjust as needed
    (lastnameElem as HTMLInputElement).value = nameDsp.innerText.split(' ')[2] || '';
    (designationElem as HTMLInputElement).value = designationDsp.innerText;
    (addressElem as HTMLInputElement).value = addressDsp.innerText;
    (emailElem as HTMLInputElement).value = emailDsp.innerText;
    (phonenoElem as HTMLInputElement).value = phonenoDsp.innerText;
    (summaryElem as HTMLTextAreaElement).value = summaryDsp.innerText;
};

// Add event listeners to handle changes in the preview section
const addPreviewEditListeners = () => {
    const editableElements = document.querySelectorAll('[contenteditable="true"]') as NodeListOf<HTMLDivElement>;
    editableElements.forEach(elem => {
        elem.addEventListener('input', updateFormFromPreview);
    });
};

// Initialize event listeners after page load
window.addEventListener('DOMContentLoaded', addPreviewEditListeners);

// Event listeners for form interactions
document.getElementById('generate-btn')!.addEventListener('click', generateCV);
imageElem.addEventListener('change', previewImage);
document.getElementById('print-btn')!.addEventListener('click', printCV);
