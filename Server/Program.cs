using Microsoft.EntityFrameworkCore;
using Server.Application.Interfaces;
using Server.Application.Services;
using Server.Infrastructure.Data;
using FluentValidation;
using Server.Application.Validators;
using Server.Infrastructure.Interfaces;
using Server.Application.Mapping;
using Server.Infrastructure.Data.Seed;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseInMemoryDatabase("OnionSA");
});

builder.Services.AddScoped<IAppDbContext>(provider =>
    provider.GetRequiredService<AppDbContext>());

builder.Services.AddAutoMapper(typeof(SpreadsheetMappingProfile));

builder.Services.AddHttpClient<IAddressService, AddressService>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISaleOrderService, SaleOrderService>();
builder.Services.AddScoped<ISpreadsheetService, SpreadsheetService>();
builder.Services.AddScoped<IOrderProductService, OrderProductService>();
builder.Services.AddScoped<ILastSpreadsheetService, LastSpreadsheetService>();
builder.Services.AddValidatorsFromAssemblyContaining<SpreadsheetRowDtoValidator>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.CanConnect();
    dbContext.Database.EnsureCreated();
    DbInitializer.Seed(dbContext); // Inicializa com dados
}

app.Run();
