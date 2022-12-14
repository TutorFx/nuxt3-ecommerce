import mongoose from "../db/connect";

// Crie o esquema para o documento de configuração
const siteConfigSchema = new mongoose.Schema({
  // Defina os campos que deseja armazenar aqui
  // Por exemplo, o título do site e a cor do tema
  title: String,
  themeColor: String,
});

// Crie o modelo de dados a partir do esquema
const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

// Agora você pode usar o modelo para executar operações de CRUD
// Por exemplo, para salvar as configurações de um site

const config = new SiteConfig({
  title: 'Meu site incrível',
  themeColor: '#FF0000',
});

config.save((err) => {
  if (err) {
    // Trate o erro aqui
  }
  // As configurações foram salvas com sucesso
});
