# from an image with full SDK
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build-stage
WORKDIR /source

# copy and publish app and libraries
COPY . .
RUN dotnet restore
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
WORKDIR /app
COPY --from=build-stage /app .

# Set environment variables
ENV ASPNETCORE_URLS=http://*:5000

ENTRYPOINT ["dotnet", "SimpleTimeTracker.dll"]