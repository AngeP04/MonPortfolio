# 1. Étape de construction : on utilise l'image officielle .NET 8
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 2. On copie le fichier de projet et on télécharge les paquets
# (Remplacez *.csproj par le nom exact si vous en avez plusieurs, ex: MonPortfolio.csproj)
COPY *.csproj ./
RUN dotnet restore

# 3. On copie tout le code et on compile pour la production
COPY . ./
RUN dotnet publish -c Release -o /app/public

# 4. Étape finale : on utilise une image légère pour faire tourner le site
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app/public
EXPOSE 8080

# ⚠️ MODIFIEZ LA LIGNE CI-DESSOUS ⚠️
# Remplacez "MonNomDeProjet.dll" par le nom de VOTRE fichier .csproj (sans le .csproj)
# Exemple : si votre projet s'appelle "MonPortfolio.csproj", écrivez "MonPortfolio.dll"
ENTRYPOINT ["dotnet", "MonPortefolio.dll"]