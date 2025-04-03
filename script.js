
const apiUrl = "https://0lh1o9fy36.execute-api.us-east-1.amazonaws.com/Prod/hello/";

async function fetchVisitorCount() {
    try {
        const response = await fetch(apiUrl);  
        const data = await response.json();    

        console.log("API Response:", data);  // Log full response for inspection

        // Check if 'visit_count' exists in the response
        if (data && data.visit_count !== undefined) {
            const count = data.visit_count;  
            const visitCountElement = document.getElementById("visit-count");

            if (visitCountElement) {
                visitCountElement.textContent = count;  
            } else {
                console.error("Element with ID 'visit-count' not found.");
            }
        } else {
            console.error("visit_count not found in the API response.");
        }
    } catch (error) {
        console.error("Error fetching visit count:", error);
        const visitCountElement = document.getElementById("visit-count");
        if (visitCountElement) {
            visitCountElement.textContent = "Error";  
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchVisitorCount();  

    const downloadBtn = document.getElementById("download-pdf");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const element = document.querySelector(".resume");  
            if (element) {
                html2pdf().from(element).save("Resume.pdf");  
            } else {
                console.error("Resume section not found!");
            }
        });
    }
});



async function fetchVisitorCount() {
    try {
        const response = await fetch(apiUrl);  
        const data = await response.json();    

        console.log("API Response:", data);  // Log full response for inspection

        // Check if 'visit_count' exists in the response
        if (data && data.visit_count !== undefined) {
            const count = data.visit_count;  
            const visitCountElement = document.getElementById("visit-count");

            if (visitCountElement) {
                visitCountElement.textContent = count;  
            } else {
                console.error("Element with ID 'visit-count' not found.");
            }
        } else {
            console.error("visit_count not found in the API response.");
        }
    } catch (error) {
        console.error("Error fetching visit count:", error);
        const visitCountElement = document.getElementById("visit-count");
        if (visitCountElement) {
            visitCountElement.textContent = "Error";  
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchVisitorCount();  

    const downloadBtn = document.getElementById("download-pdf");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const element = document.querySelector(".resume");  
            if (element) {
                html2pdf().from(element).save("Resume.pdf");  
            } else {
                console.error("Resume section not found!");
            }
        });
    }
});
c5578ba67650d33a7f90beb65329e2ade25c7c1e
