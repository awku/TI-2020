<button class="btn" onclick="_results_gender()">Wyniki według płci</button>
<button class="btn" onclick="_results_age()">Wyniki według wieku</button><br>
<svg width="500" height="350">
    <defs>
        <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1" dy="1" result="offsetblur"/>
            <feFlood flood-color="gray"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <rect class="rec opt1" id="wi1" x="25"  y="10" width="25" height="0"/>
    <rect class="rec opt2" id="wi2" x="50" y="10" width="25" height="0"/>
    <rect class="rec opt3" id="wi3" x="75" y="10" width="25" height="0"/>

    <rect class="rec opt1" id="sp1" x="150" y="10" width="25" height="0"/>
    <rect class="rec opt2" id="sp2" x="175" y="10" width="25" height="0"/>
    <rect class="rec opt3" id="sp3" x="200" y="10" width="25" height="0"/>

    <rect class="rec opt1" id="su1" x="275" y="10" width="25" height="0"/>
    <rect class="rec opt2" id="su2" x="300" y="10" width="25" height="0"/>
    <rect class="rec opt3" id="su3" x="325" y="10" width="25" height="0"/>

    <rect class="rec opt1" id="fa1" x="400" y="10" width="25" height="0"/>
    <rect class="rec opt2" id="fa2" x="425" y="10" width="25" height="0"/>
    <rect class="rec opt3" id="fa3" x="450" y="10" width="25" height="0"/>
    <text x="50" y="338" filter="url(#dropShadow)">Zima</text>
    <text x="168" y="338" filter="url(#dropShadow)">Wiosna</text>
    <text x="300" y="338" filter="url(#dropShadow)">Lato</text>
    <text x="418" y="338" filter="url(#dropShadow)">Jesień</text>
      
    <rect class="rec opt1" id="leg1r" x="400" y="0" width="10" height="0"/>
    <rect class="rec opt2" id="leg2r" x="400" y="10" width="10" height="0"/>
    <rect class="rec opt3" id="leg3r" x="400" y="20" width="10" height="0"/>
    <text x="415" y="10" id="leg1" font-size="10px"></text>
    <text x="415" y="20" id="leg2" font-size="10px"></text>
    <text x="415" y="30" id="leg3" font-size="10px"></text>
</svg>