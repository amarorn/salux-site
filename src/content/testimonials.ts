import type { Testimonial } from '@/types/site'

import avatarJose from '@/assets/photos/avatar-jose-paulino.jpg'
import avatarLisiane from '@/assets/photos/avatar-lisiane.jpg'
import avatarAnderson from '@/assets/photos/avatar-anderson.jpg'

/**
 * Depoimentos — textos integrais do PDF Home.
 * (Avatares atuais são placeholders do pacote de fotos — substituir
 * pelos retratos reais quando disponíveis.)
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Salux INITIA é a espinha dorsal da nossa operação. Não saberia como seria abrir o hospital 24 horas sem o sistema, porque ele está em tudo.',
    name: 'José Paulino Brand',
    role: 'Diretor Executivo',
    org: 'Hospital Ouro Branco',
    avatar: avatarJose,
  },
  {
    quote:
      'O controle que temos hoje é fundamental para a segurança do paciente e para a sustentabilidade da instituição.',
    name: 'Lisiane Loose',
    role: 'Gerente de Laboratório',
    org: 'Hospital Ouro Branco',
    avatar: avatarLisiane,
  },
  {
    quote:
      'A interoperabilidade nos permitiu reduzir erros, evitar retrabalhos e trazer mais agilidade para toda a operação, além de ganhos financeiros. Hoje conseguimos ter as informações que precisamos muito claras e centralizadas.',
    name: 'Anderson Borba',
    role: 'Gerente de TI',
    org: 'Unimed Vale do Caí',
    avatar: avatarAnderson,
  },
]
