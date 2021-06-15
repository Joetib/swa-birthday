(() => {
    pages = document.getElementsByClassName('page');
    all_items = document.getElementsByClassName('item');
    for (item of all_items) {
        item.classList.add('d-none');
    }
    let page_index = -1;
    let end = false;
    function reset_request() {
        window.addEventListener('click', function () {
            this.window.removeEventListener('click', this);
            end = false;
            page_index = -1;
            nextPage();
        })
    }
    function nextPage() {
        page_index++;
        if (page_index >= pages.length) {
            end = true;
            page_index = -1;
            reset_request()
            return
        }
        if (!end) {
            hideall()
            show(pages[page_index]);
        }

    }
    function get_current_page() {
        return pages[page_index];
    }
    function get_items_for_page(page) {
        let items = page.getElementsByClassName('item');
        return items;
    }
    function get_animation_duration(item){
        let duration = item.dataset.duration;
        if (duration){
            return parseInt(duration)
        }
        return 3000;
    }
    function show_item(index, item) {
        item.classList.remove("d-none");
        item.classList.add('animate_animated')

        duration = get_animation_duration(item);
        setTimeout(show_next_item, duration, index);




    }
    function show_next_item(index) {
        index++;
        let page = get_current_page();
        items = get_items_for_page(page);
        if (index >= items.length) {
            setTimeout(nextPage);
            return

        } else {
            show_item(index, items[index]);
        }
    }
    function show_items(page) {
        show_next_item(-1)

    }
    function show(page) {
        page.classList.remove("d-none");

        show_items(page);

    }
    function hideall() {
        for (page of pages) {
            page.classList.add('d-none');
        }
    }
    nextPage()
})();