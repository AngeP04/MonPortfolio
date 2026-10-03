# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier le fichier projet (assurez-vous que c'est le bon)
COPY *.csproj ./
RUN dotnet restore

# Copier le reste
COPY . ./

# Publier
RUN dotnet publish -c Release -o /app/public

# Étape 2 : Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app/public

# COPIEZ LE FICHIER DLL DEPUIS L'ÉTAPE DE BUILD
# Cette commande copie tout ce qui a été compilé dans l'image finale
COPY --from=build /app/public .

# DEBUG : Afficher la liste des fichiers avant de lancer (pour voir l'erreur dans les logs)
RUN ls -la

# LANCEMENT (REMPLACEZ LE NOM CI-DESSOUS PAR LE VRAI NOM TROUVÉ À L'ÉTAPE 1)
# Exemple : si votre fichier s'appelle Web.dll, mettez Web.dll
ENTRYPOINT ["dotnet", "MonPortfolio.dll"]