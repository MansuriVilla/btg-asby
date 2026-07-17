import csv
import json
import sys

csv_file = 'c:/Users/amp/Downloads/theme_export__blueteesgolf-com-btg-liv-asby-4-01-07-2026__09JUL2026-0340am/blue-tees-golf---wcag-2.csv'

try:
    with open(csv_file, mode='r', encoding='windows-1252') as f:
        reader = csv.reader(f)
        header = next(reader)
        issues = []
        for row in reader:
            if not row:
                continue
            
            # Assuming row structure based on snippet
            # ID, Issue, Component, ..., Status, WCAG, Assignee, Date, Recommendation, URL
            issues.append({
                'ID': row[0] if len(row) > 0 else '',
                'Issue': row[1] if len(row) > 1 else '',
                'Component': row[2] if len(row) > 2 else '',
                'Status': row[4] if len(row) > 4 else '',
                'Recommendation': row[8] if len(row) > 8 else ''
            })
        
        # Save summary to a markdown file
        with open('c:/Users/amp/Downloads/theme_export__blueteesgolf-com-btg-liv-asby-4-01-07-2026__09JUL2026-0340am/issues_summary.md', 'w', encoding='utf-8') as out:
            out.write("# Accessibility Issues Summary\n\n")
            for issue in issues:
                out.write(f"## Issue {issue['ID']}: {issue['Component']}\n")
                out.write(f"**Description:** {issue['Issue']}\n\n")
                out.write(f"**Recommendation:** {issue['Recommendation']}\n\n")
                out.write("---\n\n")
        print(f"Successfully parsed {len(issues)} issues. Written to issues_summary.md")
except Exception as e:
    print(f"Error: {e}")
