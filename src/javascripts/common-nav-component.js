const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    // 버튼의 부모인 .common-menu 요소를 찾습니다.
    const parentMenu = this.closest('.common-menu');

    if (parentMenu) {
      // .open 클래스를 토글합니다.
      const isOpen = parentMenu.classList.toggle('open');

      // 웹 접근성을 위해 aria-expanded 상태도 업데이트합니다.
      this.setAttribute('aria-expanded', isOpen);
    }
  });
});
