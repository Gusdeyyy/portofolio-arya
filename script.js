document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initSkillChart();

    console.log("🚀 Portfolio loaded successfully with new animations!");
});

/* =========================
   🔹 NAVBAR FUNCTIONALITY
   ========================= */
function initNavbar() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger?.classList.remove("active");
            navMenu?.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" });

    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;

    const phrases = ["Web Developer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = phrases[index];

        typingText.textContent = current.substring(0, charIndex);

        if (!isDeleting && charIndex < current.length) {
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        }

        if (charIndex === current.length && !isDeleting) {
            isDeleting = true;
            setTimeout(type, 1200);
            return;
        }

        if (charIndex === 0 && isDeleting) {
            isDeleting = false;
            index = (index + 1) % phrases.length;
        }

        setTimeout(type, isDeleting ? 70 : 100);
    }

    type();
}




/* =========================
   🌌 ORBIT ANIMATIONS
   ========================= */
function initOrbitAnimations() {
    const planets = document.querySelectorAll(".random-orbit");
    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 100 + index * 45;
        const duration = 10 + Math.random() * 10;
        const direction = Math.random() > 0.5 ? "normal" : "reverse";
        const name = `orbit${index}`;

        const style = document.createElement("style");
        style.textContent = `
        @keyframes ${name} {
            0% {
                transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg) scale(1);
                filter: brightness(1);
            }
            50% {
                transform: rotate(${startAngle + 180}deg) translateX(${radius}px) rotate(-${startAngle + 180}deg) scale(1.3);
                filter: brightness(1.4);
            }
            100% {
                transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg) scale(1);
                filter: brightness(1);
            }
        }`;
        document.head.appendChild(style);

        planet.style.animation = `${name} ${duration}s ease-in-out infinite ${direction}`;
        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        planet.addEventListener("mouseenter", () => planet.style.animationPlayState = "paused");
        planet.addEventListener("mouseleave", () => planet.style.animationPlayState = "running");
    });
}

/* =========================
   🌞 SUN PHOTO MODAL
   ========================= */
function initSunPhotoModal() {
    const sun = document.querySelector(".sun-core");
    const modal = document.getElementById("photo-modal");
    const closeBtn = document.querySelector(".close");
    const randomPhoto = document.getElementById("random-photo");

    if (!sun || !modal || !closeBtn || !randomPhoto) return;

    const toggleModal = (show) => {
        modal.style.display = show ? "flex" : "none";
        modal.style.opacity = show ? "1" : "0";
        modal.style.transition = "opacity 0.4s ease";
    };

    sun.addEventListener("click", () => {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
        toggleModal(true);
    });

    closeBtn.addEventListener("click", () => toggleModal(false));

    window.addEventListener("click", e => {
        if (e.target === modal) toggleModal(false);
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.style.display === "flex") toggleModal(false);
    });
}

/* =========================
   🌀 SMOOTH SCROLL
   ========================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const targetId = anchor.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: "smooth" });
            }
        });
    });
}

/* =========================
   ✨ SECTION ANIMATIONS
   ========================= */
function initSectionAnimations() {
    const animatedElements = document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = "all 1s cubic-bezier(0.19, 1, 0.22, 1)";
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
                entry.target.style.filter = "blur(0px)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px) scale(0.98)";
        el.style.filter = "blur(5px)";
        observer.observe(el);
    });
}

/* =========================
   📊 SKILL CHART 
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    const softCtx = document.getElementById("softSkillChart");
    const hardCtx = document.getElementById("hardSkillChart");

    function enableClickTooltip(chart) {

        chart.options.plugins.tooltip.enabled = true;

        chart.canvas.onclick = function (evt) {
            const points = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

            if (points.length) {
                chart.tooltip.setActiveElements(points, { x: evt.offsetX, y: evt.offsetY });
                chart.update();
            }
        };

        chart.canvas.addEventListener("click", (e) => {
            const points = chart.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
            if (!points.length) {
                chart.tooltip.setActiveElements([], { x: 0, y: 0 });
                chart.update();
            }
        });
    }

    // SOFT SKILL CHART
    if (softCtx) {
        const softChart = new Chart(softCtx, {
            type: "doughnut",
            data: {
                labels: ["Teamwork", "Communication", "Problem Solving", "Time Management"],
                datasets: [{
                    data: [85, 90, 80, 75],
                    backgroundColor: ["#1E90FF", "#00C851", "#FFBB33", "#CC33FF"],
                    borderWidth: 2,
                    borderColor: "#021c3b"
                }]
            },
            options: {
                cutout: "60%",
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false, // awalnya disembunyikan
                        callbacks: {
                            label: function (ctx) {
                                return ctx.label + ": " + ctx.raw + "%";
                            }
                        }
                    }
                }
            }
        });

        enableClickTooltip(softChart);
    }

    // HARD SKILL CHART
    if (hardCtx) {
        const hardChart = new Chart(hardCtx, {
            type: "doughnut",
            data: {
                labels: ["HTML/CSS", "JavaScript", "Laravel", "MySQL"],
                datasets: [{
                    data: [90, 85, 75, 80],
                    backgroundColor: ["#FFBB33", "#1E90FF", "#FF6699", "#00C851"],
                    borderWidth: 2,
                    borderColor: "#021c3b"
                }]
            },
            options: {
                cutout: "60%",
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false,
                        callbacks: {
                            label: function (ctx) {
                                return ctx.label + ": " + ctx.raw + "%";
                            }
                        }
                    }
                }
            }
        });

        enableClickTooltip(hardChart);
    }

});






