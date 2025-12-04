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

base_dir = r"c:\Users\jordi\Desktop\GitChessPardinyes\escacspardinyes.github.io"

# CalculadoraELO.html
try:
    filepath = os.path.join(base_dir, "CalculadoraELO.html")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    start_marker = "<!-- Contact Info -->"
    end_marker = "<!-- Fi del Peu de pàgina -->"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + new_footer + content[end_idx + len(end_marker):]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated CalculadoraELO.html")
    else:
        print("Markers not found in CalculadoraELO.html")
except Exception as e:
    print(f"Error updating CalculadoraELO.html: {e}")

# TorneigAlcarras.html
try:
    filepath = os.path.join(base_dir, "TorneigAlcarras.html")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    start_marker = "<!-- INICI FOOTER (Contacte i Xarxes Socials) - Afegida classe bg-dark per visibilitat -->"
    end_marker = "<!-- FI COPYRIGHT -->"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + new_footer + content[end_idx + len(end_marker):]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated TorneigAlcarras.html")
    else:
        print("Markers not found in TorneigAlcarras.html")
except Exception as e:
    print(f"Error updating TorneigAlcarras.html: {e}")

# simultanies.html
try:
    filepath = os.path.join(base_dir, "simultanies.html")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    start_marker = '<div class="container border-top border-dark pt-5">'
    start_idx = content.find(start_marker)
    
    if start_idx != -1:
        # Find the closing div for this container
        # It should be the next </div>
        end_idx = content.find("</div>", start_idx)
        if end_idx != -1:
             # Include the closing div (len("</div>") is 6)
            new_content = content[:start_idx] + new_footer + content[end_idx + 6:]
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print("Updated simultanies.html")
        else:
            print("Closing div not found in simultanies.html")
    else:
        print("Start marker not found in simultanies.html")
except Exception as e:
    print(f"Error updating simultanies.html: {e}")

# 404.html
try:
    filepath = os.path.join(base_dir, "404.html")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "<!-- Contacte -->" not in content:
        # Insert before </body>
        end_body_idx = content.find("</body>")
        if end_body_idx != -1:
            new_content = content[:end_body_idx] + new_footer + "\n" + content[end_body_idx:]
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print("Updated 404.html")
        else:
            print("</body> not found in 404.html")
    else:
        print("Footer already present in 404.html")
except Exception as e:
    print(f"Error updating 404.html: {e}")
