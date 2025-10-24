document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial-card");
    let index = 0;

    setInterval(() => {
        testimonials.forEach((card, i) => {
            card.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % testimonials.length;
    }, 4000);
});
