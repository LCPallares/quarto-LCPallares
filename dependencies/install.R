# install.R
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

# Instalar paquetes si no están ya instalados
install.packages(packages, repos = "https://cloud.r-project.org/")