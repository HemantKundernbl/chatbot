export const addEvents = () => {
  const btn = document.querySelectorAll(".response_button");
  btn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button);
    });
  });
};
