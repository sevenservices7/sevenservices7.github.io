// Dados de fallback usados quando o projeto Supabase do site ainda não está
// configurado (PUBLIC_SUPABASE_*). São substituídos pelos dados reais assim que
// o projeto novo for criado e seedado (ver ../../supabase/migrations).
//
// Moradas/telefones/e-mails/datas abaixo são REAIS e confirmados pelo dono
// (telefones = WhatsApp; 3 unidades abertas).
// ⚠️ Ainda a confirmar: fotos dos coordenadores e PREÇOS do catálogo.
import type { Office, TeamMember, Service } from './data';

export const fallbackOffices: Office[] = [
  {
    slug: 'albufeira',
    name: 'Albufeira',
    address: 'Rua do MFA, 111 G, 8200-157 Albufeira',
    phone: '351939146298',
    email: 'albufeira@sevens.services',
    whatsapp: '351939146298',
    lat: 37.0891,
    lng: -8.253,
    maps_url: 'https://maps.app.goo.gl/tSGdReHa7WLs3pa79',
    opening_date: '2022-08-01',
    hero_photo: '',
    coordinator_code: 'GR',
    coordinator_name: 'Gabriela Ramos',
    coordinator_role: 'Coordenadora de Processos',
    hours: { 'seg-sex': '09:00–18:00' },
    is_open: true,
    intro: 'A nossa sede, no coração do Algarve.',
  },
  {
    slug: 'faro',
    name: 'Faro',
    address: 'R. Infante Dom Henrique 111, Loja 1, 8000-363 Faro',
    phone: '351928331228',
    email: 'faro@sevens.services',
    whatsapp: '351928331228',
    lat: 37.0194,
    lng: -7.9304,
    maps_url: 'https://maps.app.goo.gl/NHcRMekVhb2rAse88',
    opening_date: '2026-01-01',
    hero_photo: '',
    coordinator_code: 'DS',
    coordinator_name: 'Dayane Silva',
    coordinator_role: 'Coordenadora de Processos',
    hours: { 'seg-sex': '09:00–18:00' },
    is_open: true,
    intro: 'Atendimento na capital de distrito do Algarve.',
  },
  {
    slug: 'porto',
    name: 'Porto',
    address: 'Praça de Mouzinho de Albuquerque 113, 5.º andar, 4100-359 Porto',
    phone: '351928406177',
    email: 'porto@sevens.services',
    whatsapp: '351928406177',
    lat: 41.1496,
    lng: -8.6109,
    maps_url: 'https://maps.app.goo.gl/ANPaRxcM1gh4RVaq8',
    opening_date: '2026-03-01',
    hero_photo: '',
    coordinator_code: '',
    coordinator_name: '',
    coordinator_role: '',
    hours: { 'seg-sex': '09:00–18:00' },
    is_open: true,
    intro: 'A nossa unidade no Norte do país.',
  },
];

export const fallbackTeam: TeamMember[] = [
  { code: 'DJ', name: 'Danilo Jesus', role_label: 'Fundador & CEO', unit: 'Albufeira', photo_url: '', founder: true },
  { code: 'AK', name: 'Ana Kathlyn', role_label: 'Advogada', unit: '', photo_url: '' },
  { code: 'GR', name: 'Gabriela Ramos', role_label: 'Coordenadora de Processos', unit: 'Albufeira', photo_url: '' },
  { code: 'DS', name: 'Dayane Silva', role_label: 'Coordenadora de Processos · Unidade de Faro', unit: 'Faro', photo_url: '' },
];

// Amostra real do catálogo (fallback). O catálogo completo (142 serviços) vive
// na tabela `services` do projeto do site — ver supabase/migrations/0003_catalog.sql.
export const fallbackServices: Service[] = [
  { code: 'AT109', name: 'NIF', category: 'a-t-financas', family: 'A.T - Finanças', price: 80 },
  { code: 'AM156', name: 'Reagrupamento Familiar', category: 'aima', family: 'AIMA', price: 150 },
  { code: 'AM160', name: 'Renovação A.R - pós 30/06/2025', category: 'aima', family: 'AIMA', price: 125 },
  { code: 'SS404', name: 'NISS', category: 'seguranca-social', family: 'Segurança Social', price: 120 },
  { code: 'IM307', name: 'Troca de Carta Condução Estrangeira', category: 'imt', family: 'IMT', price: 100 },
  { code: 'JR375', name: 'Nacionalidade PT - Casamento/União de Facto', category: 'juridico', family: 'Juridico', price: 550 },
  { code: 'CONSULT', name: 'Consultoria Online', category: 'outros', family: 'Outros', price: 80 },
];

