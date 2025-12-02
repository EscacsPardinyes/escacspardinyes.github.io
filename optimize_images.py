import os
from PIL import Image
from pathlib import Path

def optimize_images(directory):
    # Supported extensions
    extensions = {'.jpg', '.jpeg', '.png'}
    
    count = 0
    errors = 0
    
    print(f"Scanning directory: {directory}")
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = Path(root) / file
            if file_path.suffix.lower() in extensions:
                try:
                    # Open image
                    with Image.open(file_path) as img:
                        # Construct new path
                        new_path = file_path.with_suffix('.webp')
                        
                        # Skip if already exists
                        if new_path.exists():
                            print(f"Skipping (already exists): {new_path}")
                            continue
                            
                        # Convert and save
                        print(f"Converting: {file_path} -> {new_path}")
                        img.save(new_path, 'WEBP', quality=85)
                        count += 1
                        
                except Exception as e:
                    print(f"Error converting {file_path}: {e}")
                    errors += 1

    print(f"\nFinished! Converted {count} images.")
    if errors > 0:
        print(f"Encountered {errors} errors.")

if __name__ == "__main__":
    # Install Pillow if not present: pip install Pillow
    optimize_images('img')
