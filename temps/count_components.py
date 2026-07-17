import csv
from collections import Counter

csv_file = 'c:/Users/amp/Downloads/theme_export__blueteesgolf-com-btg-liv-asby-4-01-07-2026__09JUL2026-0340am/blue-tees-golf---wcag-2.csv'

try:
    with open(csv_file, mode='r', encoding='windows-1252') as f:
        reader = csv.reader(f)
        header = next(reader)
        components = []
        for row in reader:
            if not row:
                continue
            comp = row[2] if len(row) > 2 else 'Unknown'
            if comp:
                components.append(comp)
        
        counts = Counter(components)
        with open('c:/Users/amp/Downloads/theme_export__blueteesgolf-com-btg-liv-asby-4-01-07-2026__09JUL2026-0340am/component_counts.txt', 'w') as out:
            for comp, count in counts.most_common():
                out.write(f"{comp}: {count}\n")
except Exception as e:
    print(e)
