# First Stage base image
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build 
WORKDIR /source 
# Copy csproj and restore dependencies 
COPY *.csproj .
RUN dotnet restore
# Copy and publish application files
COPY . .
RUN dotnet publish -c  release -o /app
# Final Stage 
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app 
COPY --from=build /app .
ENTRYPOINT [ "dotnet", "hrapp.dll" ]

# First Stage: Build Environment
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# Restore dependencies (Optimized Layer Caching)
COPY *.csproj .
RUN dotnet restore

# Copy source code and publish release binaries
COPY . .
RUN dotnet publish -c Release -o /app /p:UseAppHost=false

# Final Stage: Lightweight Production Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
USER app
WORKDIR /app
EXPOSE 8080

COPY --from=build /app .
ENTRYPOINT ["dotnet", "hrapp.dll"]


