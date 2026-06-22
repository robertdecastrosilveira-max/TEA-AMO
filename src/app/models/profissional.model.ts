export class Profissional {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public area: 'SAÚDE' | 'EDUCACIONAL',
    public instituto: string
  ) {}
}