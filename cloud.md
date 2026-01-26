# Configuración del Proyecto

## Flujo de Trabajo

1. **n8n** → Procesa los datos del formulario
2. **Frontend (Next.js/React)** → Envía datos y muestra respuestas
3. **GitHub** → Control de versiones
4. **Vercel** → Despliegue automático

## Herramientas

### MCPs Configurados

#### n8n MCP
Acceso a configuración y documentación de nodos n8n:
- 1,084 nodos disponibles (537 core + 547 comunitarios)
- 2,709 plantillas de flujo
- Documentación de propiedades de nodos

#### Notion MCP
- Buscar, crear y actualizar páginas
- Gestionar bases de datos

#### GitHub MCP
Gestión completa de repositorios:
- **Repos**: Explorar código, buscar archivos, analizar commits
- **Issues/PRs**: Crear, actualizar, gestionar
- **Actions**: Monitorear CI/CD, analizar fallos
- **Seguridad**: Alertas de código, Dependabot
- **Colaboración**: Discusiones, notificaciones

### Skills de n8n

| Skill | Uso |
|-------|-----|
| Expression Syntax | Sintaxis de expresiones `$json`, `$node` |
| MCP Tools Expert | Uso efectivo de herramientas MCP |
| Workflow Patterns | Patrones: webhooks, HTTP, DB, IA |
| Validation Expert | Interpretar errores de validación |
| Node Configuration | Configuración de nodos |
| Code JavaScript | JavaScript en nodos Code |
| Code Python | Python en nodos Code |

### Skill Frontend Design

Crea interfaces **distintivas y profesionales**, evitando diseño genérico.

**Se activa cuando pides**: construir componentes, crear páginas, diseñar interfaces

**Proceso**:
1. Analiza propósito y usuario
2. Elige dirección estética (minimalismo brutal, maximalista, retro-futurista, etc.)
3. Aplica tipografía única, colores cohesivos, motion estratégico

**Direcciones estéticas disponibles**:
- Minimalismo brutal / Maximalista
- Retro-futurista / Orgánico
- Lujo / Lúdico
- Editorial / Brutista
- Art déco / Pastel / Industrial

## Estructura del Proyecto

```
/
├── cloud.md              # Este archivo
├── src/
│   ├── app/              # Rutas de Next.js
│   ├── components/       # Componentes React
│   └── lib/              # Utilidades y API
├── public/               # Archivos estáticos
└── package.json
```

## Proceso de Desarrollo

### 1. Optimizar Flujo n8n
- Verificar entradas/salidas de datos
- Asegurar respuestas correctas al frontend

### 2. Construir Frontend
- Crear formularios que envíen datos a n8n
- Mostrar respuestas apropiadamente

### 3. Probar Localmente
```bash
npm run dev
```

### 4. Desplegar
```bash
git add .
git commit -m "descripción"
git push origin main
```
→ Vercel sincroniza automáticamente
