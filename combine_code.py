import os

# Specify the directory to traverse
root_dir = './frontend/src'
output_file = 'combined.txt'

# Function to check if a file is readable (not binary)
def is_text_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            f.read(512)
        return True
    except Exception:
        return False

# Function to check if a file has the desired extensions
def is_js_or_jsx(filepath):
    return filepath.endswith(('.js', '.jsx'))

# Open the output file
with open(output_file, 'w', encoding='utf-8') as outfile:
    # Walk through the directory structure
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            
            # Skip the output file itself
            if os.path.abspath(filepath) == os.path.abspath(output_file):
                continue

            # Process only .js and .jsx files
            if is_js_or_jsx(filepath):
                outfile.write(f"File: {filepath}\n")
                outfile.write(f"{'-' * 80}\n")
                outfile.write("```\n")

                # Check if the file is a text file and read its content
                if is_text_file(filepath):
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as infile:
                        outfile.write(infile.read())
                else:
                    outfile.write("[Binary or Non-Readable File]\n")

                outfile.write("```\n")
                outfile.write(f"\n{'=' * 80}\n\n")

print(f"All .js and .jsx files from {root_dir} combined into {output_file}")
