import os

# New footer content from index.html
new_footer = """    <!-- Contacte -->
    <div class="footer container-fluid mt-5 py-5 px-sm-3 px-md-5 text-white">
        <div class="row pt-5">
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="text-primary mb-4" data-i18n="footer.contact">Contacta'ns</h4>
                <p><i class="fa fa-map-marker-alt mr-2"></i>Carrer Sant Pere Claver, 1, segona planta, Lleida 25005</p>
                <p><i class="fa fa-phone-alt mr-2"></i>+34 973 23 02 06</p>
                <p><i class="fa fa-envelope mr-2"></i>escacspardinyes@gmail.com</p>
                <div class="d-flex justify-content-start mt-4">
                    <!-- X (Twitter) -->
                    <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                        style="width: 40px; height: 40px;"
                        href="https://x.com/EscacsPardinyes?t=ay6leO2o66iLH8KfJB4l_Q&s=09&fbclid=PAZXh0bgNhZW0CMTEAAaYd0C4d2wpTNF8R2ziYw8tAvXs0HdOfaP_uWmfqlu7x8NY_d0omhzKJXsI_aem_gSOPQGkcPflkUMPMOVpwyw"
                        target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i>
                    </a>

                    <!-- Facebook -->
                    <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                        style="width: 40px; height: 40px;" href="https://www.facebook.com/profile.php?id=61553973365334"
                        target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook-f"></i>
                    </a>

                    <!-- Instagram -->
                    <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                        style="width: 40px; height: 40px;" href="https://www.instagram.com/clubescacspardinyes/"
                        target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>

                    <!-- YouTube -->
                    <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                        style="width: 40px; height: 40px;" href="https://www.youtube.com/@ClubEscacsPardinyes"
                        target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube"></i>
                    </a>

                    <!-- Kick 
<a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 40px; height: 40px;" href="https://kick.com/club-escacs-pardinyes/about" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-kickstarter"></i> 
</a> -->

                    <!-- TikTok 
<a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 40px; height: 40px;" href="https://www.tiktok.com/@Club_Escacs_Pardinyes" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-tiktok"></i>
</a> -->


                </div>
            </div>
        </div>
    </div>
    <!-- Fi de Contacte -->


    <!-- Peu de pàgina -->
    <div class="container border-top border-dark pt-5">
        <p class="m-0 text-center text-black">
            &copy; <a class="text-black font-weight-bold" href="privacy.html">Club Escacs Pardinyes</a>. Tots els drets
            reservats. Fundat l'any 1992.
        </p>
    </div>
    <!-- Fi del Peu de pàgina -->"""

files_to_update = [
    "about.html",
    "contact.html",
    "cookies.html",
    "feature.html",
    "federat.html",
    "privacy.html",
    "school.html"
]

base_dir = r"c:\Users\jordi\Desktop\GitChessPardinyes\escacspardinyes.github.io"

for filename in files_to_update:
    filepath = os.path.join(base_dir, filename)
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        start_marker = "<!-- Contacte -->"
        end_marker = "<!-- Fi del Peu de pàgina -->"
        
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            # Include the end marker in the replacement range to replace it as well
            # But wait, new_footer includes the end marker.
            # So we replace from start_idx to end_idx + len(end_marker)
            
            new_content = content[:start_idx] + new_footer + content[end_idx + len(end_marker):]
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"Markers not found in {filename}")
            
    except Exception as e:
        print(f"Error updating {filename}: {e}")
