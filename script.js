document.getElementById('theme-toggle').addEventListener('click',() => {
  document.body.classList.toggle('dark');
});
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.onclick = () => {
    const text = document.querySelector(btn.dataset.target).innerText.trim();
    navigator.clipboard.writeText(text).then(()=>{
      btn.textContent = '✅'; setTimeout(()=>btn.textContent='📋',800);
    });
  };
});
