/* Sortable Table Script with Arrow Indicators */
    document.addEventListener('DOMContentLoaded', () => {
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

        const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
                ? v1 - v2
                : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

        document.querySelectorAll('th').forEach(th => th.addEventListener('click', function () {
            const table = th.closest('table');
            const ascending = !this.classList.contains('sort-asc');
            Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
                .sort(comparer(Array.from(th.parentNode.children).indexOf(th), ascending))
                .forEach(tr => table.appendChild(tr));

            th.parentNode.querySelectorAll('th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
            th.classList.toggle('sort-asc', ascending);
            th.classList.toggle('sort-desc', !ascending);
        }));
    });
