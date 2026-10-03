FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copie le fichier de projet (assurez-vous que *.csproj correspond à votre fichier)
COPY *.csproj ./
RUN dotnet restore

# Copie tout le reste
COPY . ./

# Publie dans /app/public
RUN dotnet publish -c Release -o /app/public

# Image finale
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app/public

ENTRYPOINT ["dotnet", "MonPortfolio.dll"]