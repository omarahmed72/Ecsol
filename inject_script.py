import os
import glob

# Get all project-details files
files = glob.glob("project*-details.html")
if "project-details.html" not in files:
    files.append("project-details.html")
# Deduplicate
files = list(set(files))

script_tag = '<script src="lightbox.js"></script>'

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if script_tag not in content:
        # Insert just before </body>
        new_content = content.replace("</body>", f"    {script_tag}\n  </body>")
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"Already updated {file}")
