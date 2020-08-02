function tabs(parentSelector, tabSelector, contentSelector, activeClass) {

    const parentTabs = document.querySelector(parentSelector),
          tabs = document.querySelectorAll(tabSelector),
          contentTabs = document.querySelectorAll(contentSelector);

    const hideTabs = () => {
        contentTabs.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass.slice(1));
        });
    };

    const showTabs = (i = 0) => {
        contentTabs[i].style.display = 'block';
        contentTabs[i].classList.add('fade');
        tabs[i].classList.add(activeClass.slice(1));
    };

    hideTabs();
    showTabs();

    parentTabs.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabSelector.slice(1))) {
            tabs.forEach ((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });

}

export default tabs;