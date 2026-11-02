// Zentrale Inhalte, die auf mehreren Seiten vorkommen.
// Platzhalter in [ECKIGEN KLAMMERN] vor dem Livegang durch Kundendaten ersetzen.

export interface NavItem {
  id: string
  label: string
}

export const mainNav: NavItem[] = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'referenzen', label: 'Referenzen' },
  { id: 'ueber-uns', label: 'Über uns' },
  { id: 'ablauf', label: 'Ablauf' },
  { id: 'kontakt', label: 'Kontakt' },
]

export const footerNav: NavItem[] = mainNav.filter(item => item.id !== 'ablauf')

export const links = {
  tel: 'tel:[TELEFON_E164]',
  mail: 'mailto:[E-MAIL]',
  whatsapp: 'https://wa.me/[WHATSAPP_E164_OHNE_PLUS]',
}
