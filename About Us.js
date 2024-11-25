  async function loadTeamData() {
    const teamContainer = document.getElementById("team-members");

    try {
      // Fetch the external JSON file
      const response = await fetch("About\ Us.json");
      const teamData = await response.json();

      teamData.forEach(member => {
        // Create elements
        const teamMemberDiv = document.createElement("div");
        teamMemberDiv.classList.add("team-member");

        const img = document.createElement("img");
        img.src = member.imgSrc;
        img.alt = member.name;
        img.classList.add("profile-pic");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const role = document.createElement("p");
        role.textContent = member.role;

        const socialLinksDiv = document.createElement("div");
        socialLinksDiv.classList.add("social-links");

        // Social links
        const linkedinLink = document.createElement("a");
        linkedinLink.href = member.socialLinks.linkedin;
        linkedinLink.innerHTML = '<i class="fab fa-linkedin"></i>';
        socialLinksDiv.appendChild(linkedinLink);

        const emailLink = document.createElement("a");
        emailLink.href = member.socialLinks.email;
        emailLink.innerHTML = '<i class="fas fa-envelope"></i>';
        socialLinksDiv.appendChild(emailLink);

        const instagramLink = document.createElement("a");
        instagramLink.href = member.socialLinks.instagram;
        instagramLink.innerHTML = '<i class="fab fa-instagram"></i>';
        socialLinksDiv.appendChild(instagramLink);

        // Append elements to team member div
        teamMemberDiv.appendChild(img);
        teamMemberDiv.appendChild(name);
        teamMemberDiv.appendChild(role);
        teamMemberDiv.appendChild(socialLinksDiv);

        // Add to team container
        teamContainer.appendChild(teamMemberDiv);
      });
    } catch (error) {
      console.error("Error loading team data:", error);
    }
  }

  // Load team data on page load
  window.onload = loadTeamData;
