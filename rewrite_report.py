from pathlib import Path
p = Path('report-update.html')
html = p.read_text(encoding='utf-8')
head = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WCAG Accessibility Audit - Final Status Report</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #f8fafc; }
    .sticky-header th { position: sticky; top: 0; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); }
    .datatable tr:nth-child(odd) { background-color: rgba(248, 250, 252, 0.95); }
    .datatable td, .datatable th { border-color: #e2e8f0; }
  </style>
</head>
<body class="text-slate-900">
  <div class="min-h-screen max-w-7xl mx-auto p-6 lg:px-8">
    <header class="mb-8">
      <p class="text-sm uppercase tracking-[0.3em] text-slate-500">Accessibility audit</p>
      <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">WCAG Accessibility Audit - Final Status Report</h1>
      <p class="mt-4 max-w-3xl text-slate-700 leading-7">This report summarizes the status of the <strong>147 accessibility issues</strong> checked during this audit. In accordance with your request, <strong>color contrast issues</strong> have been ignored and tagged as <code>[COLOR CONTRAST - DESIGNER]</code> so that you can work with the designer to fix them. Theme code modifications have been applied to resolve all other issues.</p>
    </header>
'''
footer = '''  </div>
  <script>
    const rows = Array.from(document.querySelectorAll('#issuesTable tbody tr'));
    const statusSelect = document.getElementById('statusFilter');
    const locationSelect = document.getElementById('locationFilter');
    const searchInput = document.getElementById('searchInput');
    const guidelineInput = document.getElementById('guidelineFilter');
    const resultCount = document.getElementById('resultCount');
    const resetButton = document.getElementById('resetFilters');

    function normalize(value) {
      return value.trim().toLowerCase();
    }

    function populateLocations() {
      const locations = new Set();
      rows.forEach(row => {
        const location = normalize(row.children[2].textContent);
        if (location) locations.add(location);
      });
      Array.from(locations).sort((a, b) => a.localeCompare(b)).forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location.replace(/\b\w/g, c => c.toUpperCase());
        locationSelect.appendChild(option);
      });
    }

    function filterRows() {
      const statusValue = normalize(statusSelect.value);
      const locationValue = normalize(locationSelect.value);
      const searchValue = normalize(searchInput.value);
      const guidelineValue = normalize(guidelineInput.value);
      let visible = 0;
      rows.forEach(row => {
        const rowText = normalize(row.textContent);
        const statusText = normalize(row.children[4].textContent);
        const locationText = normalize(row.children[2].textContent);
        const guidelineText = normalize(row.children[1].textContent);
        const matchesStatus = statusValue === 'all' || statusText.includes(statusValue);
        const matchesLocation = locationValue === 'all' || locationText === locationValue;
        const matchesSearch = !searchValue || rowText.includes(searchValue);
        const matchesGuideline = !guidelineValue || guidelineText.includes(guidelineValue);
        const show = matchesStatus && matchesLocation && matchesSearch && matchesGuideline;
        row.style.display = show ? '' : 'none';
        if (show) visible += 1;
      });
      resultCount.textContent = visible;
    }

    function resetFilters() {
      statusSelect.value = 'all';
      locationSelect.value = 'all';
      searchInput.value = '';
      guidelineInput.value = '';
      filterRows();
      searchInput.focus();
    }

    document.querySelectorAll('#statusFilter, #locationFilter, #searchInput, #guidelineFilter').forEach(el => el.addEventListener('input', filterRows));
    resetButton.addEventListener('click', resetFilters);
    populateLocations();
    filterRows();
  </script>
</body>
</html>'''

html = html.replace('<h1 id="wcag-accessibility-audit---final-status-report">', '<h1 id="wcag-accessibility-audit---final-status-report" class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">', 1)
html = html.replace('<p>\n  This report summarizes the status of the\n', '<p class="mt-4 max-w-3xl text-slate-700 leading-7">\n', 1)
html = html.replace('<h2 id="status-summary">Status Summary</h2>', '<h2 id="status-summary" class="mt-10 text-2xl font-semibold text-slate-900">Status Summary</h2>', 1)
html = html.replace('<ul>', '<ul class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">', 1)
html = html.replace('<li><strong>Total Issues Screened:</strong> 147</li>', '<li class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"><strong>Total Issues Screened:</strong> 147</li>')
html = html.replace('<li>\n    <strong>Color Contrast Issues:</strong> 39 (Skipped, tagged as\n    <code>[COLOR CONTRAST - DESIGNER]</code>)\n  </li>', '<li class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">\n    <strong>Color Contrast Issues:</strong> 39 (Skipped, tagged as\n    <code>[COLOR CONTRAST - DESIGNER]</code>)\n  </li>')
html = html.replace('<li>\n    <strong>Theme Code Fixes Applied:</strong> 93 (<code\n      >[COMPLETED - FIXED]</code\n    >)\n  </li>', '<li class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">\n    <strong>Theme Code Fixes Applied:</strong> 93 (<code>[COMPLETED - FIXED]</code>)\n  </li>')
html = html.replace('<li>\n    <strong>Already Compliant / Verified:</strong> 11 (<code\n      >[COMPLETED - ALREADY APPLIED / VERIFIED]</code\n    >)\n  </li>', '<li class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">\n    <strong>Already Compliant / Verified:</strong> 11 (<code>[COMPLETED - ALREADY APPLIED / VERIFIED]</code>)\n  </li>')
html = html.replace('<li>\n    <strong>External Third-Party App Configuration:</strong> 4 (<code\n      >[EXTERNAL - APP SETTINGS]</code\n    >)\n  </li>', '<li class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">\n    <strong>External Third-Party App Configuration:</strong> 4 (<code>[EXTERNAL - APP SETTINGS]</code>)\n  </li>')
html = html.replace('</ul>\n<hr />', '</ul>\n<section class="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">\n  <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">\n    <div>\n      <p class="text-sm font-semibold text-slate-900">Filter issues</p>\n      <p class="mt-1 text-sm text-slate-600">Use search, status, location, or guideline filters to narrow the table.</p>\n    </div>\n    <div class="flex flex-wrap items-center gap-3">\n      <button id="resetFilters" type="button" class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">Reset filters</button>\n      <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Showing <strong id="resultCount">0</strong> results</span>\n    </div>\n  </div>\n  <div class="mt-6 grid gap-4 lg:grid-cols-4">\n    <label class="block">\n      <span class="text-sm font-semibold text-slate-700">Search</span>\n      <input id="searchInput" type="text" aria-label="Search issues" placeholder="Search issues, locations, or notes" class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-300" />\n    </label>\n    <label class="block">\n      <span class="text-sm font-semibold text-slate-700">Status</span>\n      <select id="statusFilter" class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-300">\n        <option value="all">All statuses</option>\n        <option value="completed - fixed">Completed - Fixed</option>\n        <option value="completed - verified">Completed - Verified</option>\n        <option value="completed - already applied">Completed - Already Applied</option>\n        <option value="external - app settings">External - App Settings</option>\n        <option value="color contrast - designer">Color Contrast - Designer</option>\n      </select>\n    </label>\n    <label class="block">\n      <span class="text-sm font-semibold text-slate-700">Location</span>\n      <select id="locationFilter" class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-300">\n        <option value="all">All locations</option>\n      </select>\n    </label>\n    <label class="block">\n      <span class="text-sm font-semibold text-slate-700">Guideline</span>\n      <input id="guidelineFilter" type="text" aria-label="Filter by guideline" placeholder="Search WCAG guideline text" class="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-300" />\n    </label>\n  </div>\n</section>\n<hr />', 1)
html = html.replace('<table>', '<div class="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm"><table id="issuesTable" class="datatable min-w-full border-separate border-spacing-0 text-sm text-slate-700">', 1)
html = html.replace('</table>', '</table></div>', 1)
html = html.replace('<thead>', '<thead class="sticky-header">', 1)
html = html.replace('<th>S.No</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">S.No</th>', 1)
html = html.replace('<th style="">WCAG Guideline</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">WCAG Guideline</th>', 1)
html = html.replace('<th style="">Location</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">Location</th>', 1)
html = html.replace('<th style="">Description</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">Description</th>', 1)
html = html.replace('<th>Status</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">Status</th>', 1)
html = html.replace('<th>Action Taken / Recommendation</th>', '<th class="bg-slate-900 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">Action Taken / Recommendation</th>', 1)
html = html.replace('<tbody>', '<tbody class="divide-y divide-slate-200 bg-white">', 1)
html = html.replace('<td>', '<td class="px-4 py-4 align-top text-slate-700">', 999)
html = head + html + footer
p.write_text(html, encoding='utf-8')
