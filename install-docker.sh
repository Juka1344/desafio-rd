#!/bin/bash

echo "🚀 Instalando Docker no sistema..."

# Detectar distribuição Linux
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    echo "❌ Não foi possível detectar a distribuição Linux"
    exit 1
fi

echo "📋 Sistema detectado: $OS $VER"

# Função para Ubuntu/Debian
install_ubuntu_debian() {
    echo "🐧 Instalando Docker para Ubuntu/Debian..."
    
    # Atualizar sistema
    sudo apt update
    sudo apt upgrade -y
    
    # Instalar dependências
    sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
    # Adicionar chave GPG
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Adicionar repositório
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Instalar Docker
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Adicionar usuário ao grupo docker
    sudo usermod -aG docker $USER
    
    echo "✅ Docker instalado com sucesso!"
}

# Função para CentOS/RHEL/Fedora
install_centos_rhel_fedora() {
    echo "🐧 Instalando Docker para CentOS/RHEL/Fedora..."
    
    # Instalar dependências
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    
    # Adicionar repositório
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
    # Instalar Docker
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Iniciar e habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Adicionar usuário ao grupo
    sudo usermod -aG docker $USER
    
    echo "✅ Docker instalado com sucesso!"
}

# Instalar baseado na distribuição
case $OS in
    *"Ubuntu"*|*"Debian"*)
        install_ubuntu_debian
        ;;
    *"CentOS"*|*"Red Hat"*|*"Fedora"*)
        install_centos_rhel_fedora
        ;;
    *)
        echo "❌ Distribuição não suportada: $OS"
        echo "📚 Consulte o README.md para instruções manuais"
        exit 1
        ;;
esac

echo ""
echo "🔧 Configuração final..."
echo "📝 IMPORTANTE: Faça logout e login novamente para aplicar as mudanças de grupo"
echo ""
echo "🧪 Para testar a instalação:"
echo "   docker --version"
echo "   docker compose version"
echo ""
echo "🚀 Para executar a aplicação:"
echo "   cd desafio-rd"
echo "   docker compose up --build"
echo ""
echo "✅ Instalação concluída!"
