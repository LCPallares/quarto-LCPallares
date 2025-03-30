# install.R
# Establecer la carpeta de instalación global (para el caché)
.libPaths("/usr/local/lib/R/site-library")

# Lista de paquetes necesarios
packages <- c(
  "knitr",
  "rmarkdown",
  "ggplot2",
  "dplyr",
  "tidyr",
  "readr",
  "lubridate",
  "stringr",
  "plotly",
  "data.table",
  "caret"
)

# Función para instalar solo si no está presente
install_if_missing <- function(pkg) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    install.packages(pkg, repos = "https://cloud.r-project.org/", 
                     dependencies = c("Depends", "Imports"))
  }
}

# Aplicar la función a todos los paquetes
invisible(lapply(packages, install_if_missing))