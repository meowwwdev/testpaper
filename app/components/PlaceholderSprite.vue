<!--
  Platzhalter-Motive (§5) bis echte Fotos vorliegen: Inline-SVG im Markenstil, lokal, ohne externe Dienste.
  Farben ausschließlich über Theme-Tokens (inline `style`, wird in <use> geklont), damit die Motive
  Light und Dark Mode inkl. manuellem Umschalten folgen. Format 4:3, wichtige Inhalte mittig (Zuschnitt 4:5).
-->
<template>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <!-- Fassade: Einfamilienhaus, frisch gestrichen -->
    <symbol id="ph-facade" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-petrol-light)" />
      <circle cx="318" cy="66" r="28" style="fill:var(--color-robin-light)" />
      <rect y="248" width="400" height="52" style="fill:var(--color-sand)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M60 250c0-22 14-34 30-34s30 12 30 34M282 250c0-18 12-28 26-28s26 10 26 28" style="fill:var(--color-line)" />
        <rect x="122" y="132" width="156" height="118" style="fill:var(--color-surface)" />
        <path d="M108 136 200 64l92 72z" style="fill:var(--color-robin)" />
        <rect x="140" y="152" width="34" height="34" rx="2" style="fill:var(--color-petrol-light)" />
        <rect x="226" y="152" width="34" height="34" rx="2" style="fill:var(--color-petrol-light)" />
        <path d="M157 152v34M243 152v34M140 169h34M226 169h34" style="fill:none" />
        <path d="M184 250v-46a16 16 0 0 1 32 0v46" style="fill:var(--color-petrol)" />
        <path d="M30 278h340" style="fill:none" />
      </g>
      <path d="M128 236c34-6 82-8 146-2" style="fill:none;stroke:var(--color-robin);stroke-width:6;stroke-linecap:round;opacity:.55" />
    </symbol>

    <!-- Mehrfamilienhaus / Treppenhaus -->
    <symbol id="ph-apartment" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-petrol-light)" />
      <rect y="262" width="400" height="38" style="fill:var(--color-sand)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <rect x="120" y="40" width="160" height="222" style="fill:var(--color-surface)" />
        <rect x="120" y="40" width="160" height="16" style="fill:var(--color-robin)" />
        <g style="fill:var(--color-petrol-light)">
          <rect x="140" y="76" width="30" height="34" rx="2" /><rect x="185" y="76" width="30" height="34" rx="2" /><rect x="230" y="76" width="30" height="34" rx="2" />
          <rect x="140" y="130" width="30" height="34" rx="2" /><rect x="185" y="130" width="30" height="34" rx="2" /><rect x="230" y="130" width="30" height="34" rx="2" />
          <rect x="140" y="184" width="30" height="34" rx="2" /><rect x="230" y="184" width="30" height="34" rx="2" />
        </g>
        <rect x="184" y="196" width="32" height="66" style="fill:var(--color-petrol)" />
        <path d="M44 262V120M44 150h40M44 200h40M84 262V120" style="fill:none" />
      </g>
      <path d="M126 236h148" style="fill:none;stroke:var(--color-robin);stroke-width:6;stroke-linecap:round;opacity:.55" />
    </symbol>

    <!-- Innenraum, frisch gestrichen (auch „Nachher“) -->
    <symbol id="ph-room" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-robin-light)" />
      <rect y="232" width="400" height="68" style="fill:var(--color-sand)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M0 232h400" style="fill:none" />
        <rect x="56" y="70" width="96" height="110" rx="3" style="fill:var(--color-surface)" />
        <rect x="68" y="82" width="72" height="86" style="fill:var(--color-petrol-light)" />
        <path d="M104 82v86M68 125h72" style="fill:none" />
        <path d="M226 232v-36c0-10 8-18 18-18h52c10 0 18 8 18 18v36" style="fill:var(--color-surface)" />
        <path d="M218 214h104" style="fill:none" />
        <path d="M344 232l-6-30h28l-6 30z" style="fill:var(--color-robin)" />
        <path d="M352 202c-10-16-4-34 0-40 4 6 12 22 0 40M352 202c6-12 18-16 22-16-2 6-8 16-22 16" style="fill:var(--color-line)" />
      </g>
      <path d="M190 64c40-8 90-10 150-4" style="fill:none;stroke:var(--color-robin);stroke-width:10;stroke-linecap:round;opacity:.5" />
    </symbol>

    <!-- Innenraum vorher: verblasst, Flecken und Risse -->
    <symbol id="ph-room-before" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-sand)" />
      <rect y="232" width="400" height="68" style="fill:var(--color-line)" />
      <g style="fill:var(--color-line);opacity:.8">
        <ellipse cx="200" cy="70" rx="36" ry="20" /><ellipse cx="318" cy="150" rx="26" ry="34" /><ellipse cx="34" cy="200" rx="22" ry="16" />
      </g>
      <g style="stroke:var(--color-ink-muted);stroke-width:3;stroke-linejoin:round;stroke-linecap:round;fill:none">
        <path d="M0 232h400" />
        <rect x="56" y="70" width="96" height="110" rx="3" style="fill:var(--color-surface)" />
        <rect x="68" y="82" width="72" height="86" style="fill:var(--color-petrol-light);opacity:.6" />
        <path d="M104 82v86M68 125h72" />
        <path d="M262 0l-8 30 12 18-10 26 6 18" />
        <path d="M226 232v-36c0-10 8-18 18-18h52c10 0 18 8 18 18v36" style="fill:var(--color-surface);opacity:.7" />
        <path d="M218 214h104" />
      </g>
    </symbol>

    <!-- Tapezieren: Streifentapete mit Rolle -->
    <symbol id="ph-wallpaper" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-surface)" />
      <g style="fill:var(--color-petrol-light)">
        <rect x="0" width="40" height="240" /><rect x="80" width="40" height="240" /><rect x="160" width="40" height="240" />
      </g>
      <g style="fill:var(--color-robin-light)">
        <rect x="200" width="200" height="240" />
      </g>
      <rect y="240" width="400" height="60" style="fill:var(--color-sand)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M0 240h400M200 0v240" style="fill:none" />
        <path d="M232 0h60v176c0 8-6 14-14 14h-32c-8 0-14-6-14-14z" style="fill:var(--color-petrol-light)" />
        <path d="M244 0v176M262 0v176M280 0v176" style="fill:none;opacity:.4" />
        <rect x="236" y="234" width="120" height="30" rx="15" style="fill:var(--color-robin-light)" />
        <ellipse cx="342" cy="249" rx="8" ry="15" style="fill:var(--color-robin)" />
        <path d="M120 270l46-46 12 12-46 46z" style="fill:var(--color-robin)" />
      </g>
    </symbol>

    <!-- Lackierte Holztreppe -->
    <symbol id="ph-stairs" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-petrol-light)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M60 300v-36h56v-36h56v-36h56v-36h56v-36h56v-36h60V300z" style="fill:var(--color-surface)" />
        <g style="fill:var(--color-robin)">
          <rect x="60" y="264" width="56" height="8" /><rect x="116" y="228" width="56" height="8" /><rect x="172" y="192" width="56" height="8" />
          <rect x="228" y="156" width="56" height="8" /><rect x="284" y="120" width="56" height="8" /><rect x="340" y="84" width="60" height="8" />
        </g>
        <path d="M70 196 360 22M88 264v-58M144 228v-56M200 192v-56M256 156v-56M312 120v-56" style="fill:none" />
      </g>
      <path d="M46 70c26-6 54-8 84-4" style="fill:none;stroke:var(--color-robin);stroke-width:8;stroke-linecap:round;opacity:.5" />
    </symbol>

    <!-- Kalkputz-/Spachteltechnik -->
    <symbol id="ph-texture" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-sand)" />
      <g style="fill:none;stroke-linecap:round">
        <path d="M-10 60c60-20 120 20 180 0s120-30 240 0" style="stroke:var(--color-line);stroke-width:26" />
        <path d="M-10 130c80 18 140-22 220-6s120 26 200-4" style="stroke:var(--color-robin-light);stroke-width:30" />
        <path d="M-10 196c70-24 150 12 210-4s130-18 210 8" style="stroke:var(--color-line);stroke-width:22" />
      </g>
      <rect y="236" width="400" height="64" style="fill:var(--color-surface)" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M0 236h400" style="fill:none" />
        <path d="M150 170h110l-14 30H164z" style="fill:var(--color-petrol-light)" />
        <path d="M205 170v-20c0-6 4-10 10-10h22" style="fill:none" />
        <rect x="236" y="130" width="40" height="18" rx="9" style="fill:var(--color-robin)" />
      </g>
    </symbol>

    <!-- Porträt Inhaber/Team -->
    <symbol id="ph-portrait" viewBox="0 0 400 300">
      <rect width="400" height="300" style="fill:var(--color-petrol-light)" />
      <path d="M96 110c60-14 140-16 210-6" style="fill:none;stroke:var(--color-robin);stroke-width:26;stroke-linecap:round;opacity:.45" />
      <g style="stroke:var(--color-petrol);stroke-width:3;stroke-linejoin:round;stroke-linecap:round">
        <path d="M118 300c0-50 36-82 82-82s82 32 82 82z" style="fill:var(--color-surface)" />
        <path d="M178 222l22 40 22-40" style="fill:var(--color-petrol-light)" />
        <path d="M160 300v-46M240 300v-46" style="fill:none" />
        <circle cx="200" cy="170" r="40" style="fill:var(--color-surface)" />
        <path d="M158 160c0-26 18-40 42-40s42 14 42 40z" style="fill:var(--color-robin)" />
        <path d="M150 160h62" style="fill:none" />
      </g>
    </symbol>
  </svg>
</template>
