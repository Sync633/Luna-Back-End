const formatarNomeImg = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

export { formatarNomeImg };