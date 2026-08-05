import re

filepath = r"c:\Users\jordi\Desktop\GitChessPardinyes\escacspardinyes.github.io\src\data\translations.js"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Translations to add
ca_add = """        "festamajor.chronicle_badge": "Torneig Finalitzat",
        "festamajor.chronicle_title": "Crònica del Torneig de Festa Major 2026",
        "festamajor.chronicle_subtitle": "Gran èxit de participació en aquesta edició del torneig, amb victòria ajustada per a Daniel Badia (C.E. Balaguer) després d'un emocionant triple empat al capdavant.",
        "festamajor.chronicle_btn": "Veure la Classificació Final Completa",
        "festamajor.summary_title": "Resum del Torneig",
        "festamajor.summary_p1": "El torneig ha conclòs amb un nivell espectacular i molta emoció fins a la darrera ronda. <strong>Daniel Badia Freixes</strong> (C.E. Balaguer) s'ha endut el campionat gràcies a un millor coeficient de desempat, liderant el grup de jugadors amb 7 punts. El podi absolut l'han completat <strong>Daniel Sastre Martin</strong> (C.E. Lleida) com a subcampió i <strong>Edgar Niubo Parramon</strong> (C.E. Mollerussa) en tercera posició.",
        "festamajor.summary_p2": "L'actuació dels jugadors del <strong>Club Escacs Pardinyes</strong> ha estat excel·lent, situant a dos jugadors dins del Top 10 absolut: l'incombustible veterà <strong>Àngel Blanch Plana</strong> (7è lloc) i la jove promesa <strong>Eloi Canales Gómez</strong> (8è lloc), ambdós sumant 6 punts de gran mèrit.",
        "festamajor.honor_title": "Quadre d'Honor i Trofeus",
        "festamajor.gallery_title": "Galeria Fotogràfica",
        "festamajor.gallery_desc": "Repassa les millors imatges de la jornada. Fes clic sobre qualsevol d'elles per ampliar-la.",
"""

es_add = """        "festamajor.chronicle_badge": "Torneo Finalizado",
        "festamajor.chronicle_title": "Crónica del Torneo de Fiesta Mayor 2026",
        "festamajor.chronicle_subtitle": "Gran éxito de participación en esta edición del torneo, con victoria ajustada para Daniel Badia (C.E. Balaguer) tras un emocionante triple empate en cabeza.",
        "festamajor.chronicle_btn": "Ver la Clasificación Final Completa",
        "festamajor.summary_title": "Resumen del Torneo",
        "festamajor.summary_p1": "El torneo ha concluido con un nivel espectacular y mucha emoción hasta la última ronda. <strong>Daniel Badia Freixes</strong> (C.E. Balaguer) se ha llevado el campeonato gracias a un mejor coeficiente de desempate, liderando el grupo de jugadores con 7 puntos. El podio absoluto lo han completado <strong>Daniel Sastre Martin</strong> (C.E. Lleida) como subcampeón y <strong>Edgar Niubo Parramon</strong> (C.E. Mollerussa) en tercera posición.",
        "festamajor.summary_p2": "La actuación de los jugadores del <strong>Club Escacs Pardinyes</strong> ha sido excelente, situando a dos jugadores dentro del Top 10 absoluto: el incombustible veterano <strong>Àngel Blanch Plana</strong> (7º lugar) y la joven promesa <strong>Eloi Canales Gómez</strong> (8º lugar), ambos sumando 6 puntos de gran mérito.",
        "festamajor.honor_title": "Cuadro de Honor y Trofeos",
        "festamajor.gallery_title": "Galería Fotográfica",
        "festamajor.gallery_desc": "Repasa las mejores imágenes de la jornada. Haz clic sobre cualquiera de ellas para ampliarla.",
"""

en_add = """        "festamajor.chronicle_badge": "Tournament Finished",
        "festamajor.chronicle_title": "Festa Major Tournament 2026 Chronicle",
        "festamajor.chronicle_subtitle": "Great participation success in this edition of the tournament, with a tight victory for Daniel Badia (C.E. Balaguer) after an exciting three-way tie at the top.",
        "festamajor.chronicle_btn": "View Full Final Standings",
        "festamajor.summary_title": "Tournament Summary",
        "festamajor.summary_p1": "The tournament concluded with a spectacular level and a lot of excitement until the last round. <strong>Daniel Badia Freixes</strong> (C.E. Balaguer) took the championship thanks to a better tiebreak coefficient, leading the group of players with 7 points. The absolute podium was completed by <strong>Daniel Sastre Martin</strong> (C.E. Lleida) as runner-up and <strong>Edgar Niubo Parramon</strong> (C.E. Mollerussa) in third position.",
        "festamajor.summary_p2": "The performance of the <strong>Club Escacs Pardinyes</strong> players was excellent, placing two players in the absolute Top 10: the unstoppable veteran <strong>Àngel Blanch Plana</strong> (7th place) and the young promise <strong>Eloi Canales Gómez</strong> (8th place), both scoring a very meritorious 6 points.",
        "festamajor.honor_title": "Honor Roll and Trophies",
        "festamajor.gallery_title": "Photo Gallery",
        "festamajor.gallery_desc": "Review the best images of the day. Click on any of them to enlarge.",
"""

content = re.sub(r'("festamajor\.history_btn": "Consulta les classificacions d\'anys anteriors",)', r'\1\n' + ca_add, content, count=1)
content = re.sub(r'("festamajor\.history_btn": "Consulta las clasificaciones de años anteriores",)', r'\1\n' + es_add, content, count=1)
content = re.sub(r'("festamajor\.history_btn": "Check previous years standings",)', r'\1\n' + en_add, content, count=1)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Translations added successfully.")
