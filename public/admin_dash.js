// Display a welcome message based on the time of day
document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.createElement("p");
    const currentTime = new Date().getHours();

    let greeting;
    if (currentTime < 12) {
        greeting = "Good Morning!";
    } else if (currentTime < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    welcomeMessage.textContent = `${greeting} Welcome to The Next Chapter Admin Dashboard.`;
    welcomeMessage.style.color = "#1A535C";
    welcomeMessage.style.fontSize = "18px";
    welcomeMessage.style.marginBottom = "20px";

    const dashboardContainer = document.querySelector(".dashboard-container");
    dashboardContainer.insertBefore(welcomeMessage, dashboardContainer.querySelector("p"));
});

// Add confirmation dialog for sensitive actions
document.addEventListener("click", (event) => {
    if (event.target.matches(".dashboard-button[href='delete_book.html']")) {
        const confirmDelete = confirm("Are you sure you want to proceed to the delete page?");
        if (!confirmDelete) {
            event.preventDefault();
        }
    }
});
