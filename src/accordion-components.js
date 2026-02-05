document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion-components');

  accordions.forEach((accordion) => {
    const head = accordion.querySelector('.accordion-head');
    const body = accordion.querySelector('.accordion-body');

    // 초기 스타일
    body.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    body.style.overflow = 'hidden';
    body.style.height = head.getAttribute('aria-expanded') === 'false' ? '0px' : 'auto';

    const closeAccordion = (targetHead, targetBody) => {
      targetHead.setAttribute('aria-expanded', 'false');
      targetHead.classList.remove('open');
      targetBody.style.height = targetBody.scrollHeight + 'px';
      requestAnimationFrame(() => {
        targetBody.style.height = '0px';
      });
      targetBody.addEventListener('transitionend', function handler() {
        targetBody.hidden = true;
        targetBody.removeEventListener('transitionend', handler);
      });
    };

    const openAccordion = (targetHead, targetBody) => {
      targetHead.setAttribute('aria-expanded', 'true');
      targetHead.classList.add('open');
      targetBody.hidden = false;
      const scrollHeight = targetBody.scrollHeight;
      requestAnimationFrame(() => {
        targetBody.style.height = scrollHeight + 'px';
      });
      targetBody.addEventListener('transitionend', function handler() {
        if (targetHead.getAttribute('aria-expanded') === 'true') {
          targetBody.style.height = 'auto';
        }
        targetBody.removeEventListener('transitionend', handler);
      });
    };

    head.addEventListener('click', () => {
      const isOpen = head.getAttribute('aria-expanded') === 'true';

      // 다른 열려 있는 아코디언 닫기
      accordions.forEach((other) => {
        if (other !== accordion) {
          const otherHead = other.querySelector('.accordion-head');
          const otherBody = other.querySelector('.accordion-body');
          if (otherHead.getAttribute('aria-expanded') === 'true') {
            closeAccordion(otherHead, otherBody);
          }
        }
      });

      // 현재 아코디언 토글
      if (isOpen) {
        closeAccordion(head, body);
      } else {
        openAccordion(head, body);
      }
    });
  });
});
