var builder = WebApplication.CreateBuilder(args);

// 1. Ajouter les services nécessaires pour servir des fichiers statiques
builder.Services.AddRouting(); // Nécessaire pour la gestion des URLs

var app = builder.Build();

// 2. Configurer le pipeline de requêtes HTTP

// Activer le serveur de fichiers par défaut (cherche dans wwwroot)
app.UseDefaultFiles(); // Cherche index.html par défaut
app.UseStaticFiles();  // Rend les fichiers (css, js, images) accessibles

// 3. Redirection optionnelle : Si on arrive à la racine, on s'assure que ça charge index.html
app.MapGet("/", () => Results.Redirect("/index.html"));

// 4. Lancer le serveur
// Le navigateur s'ouvrira automatiquement si "launchBrowser": true est dans Properties/launchSettings.json
app.Run();