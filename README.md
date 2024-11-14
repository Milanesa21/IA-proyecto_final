#  Trabajo Practico Final - Sistema RAG usando LangChain y Ollama

Este proyecto corresponde al trabajo final de la materia de Inteligencia Artificial. El sistema consiste en un chatbot con IA que incluye un backend desarrollado con FastAPI y un frontend basado en JavaScript.

## Instrucciones para ejecutar el proyecto

### 1. Backend (API)

1. Navegar a la carpeta del backend:
   ```bash
   cd Back_IA
    ```

2. Instalar las dependencias necesarias:
```bash
pip install FastApi[all] langchain langchain_community langchain_chroma fastembed pymupdf
```

3. Ejecutar el servidor de desarrollo:
```bash
uvicorn main:app --reload
```

### 2. Frontend

1. Navegar a la carpeta del frontend
   ```
   cd Front_ia
    ```

2. Instalar las dependencias necesarias:
   ```
   npm i
    ```
3. Ejecutar el servidor de desarrollo:
   ```
   npm run dev
    ```

  ### Una vez completados estos pasos, el sistema estará corriendo tanto en el backend como en el frontend.
