import React from 'react';
import {
  Route,
  Switch,
  Link,
}  from 'react-router-dom';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  colors,
} from '@material-ui/core';
import * as FaIcons from 'react-icons/fa';
import { useStyles } from './estilo.js';
import { useTheme } from '@material-ui/core/styles';
import { DadosBarraNavegacao } from './DadosBarraNavegacao';
import clsx from 'clsx';

import Inicio from '../../paginas/inicio/Inicio.js';
import Associados from '../../paginas/associados/Associados.js';
import Eventos from '../../paginas/eventos/Eventos.js';
import Atas from '../../paginas/atas/Atas.js';
import Noticias from '../../paginas/noticias/Noticias.js';
import Classificados from '../../paginas/classificados/Classificados.js';
import Fotos from '../../paginas/fotos/Fotos.js';
import Videos from '../../paginas/videos/Videos.js';
import Site from '../../paginas/site/Site.js';
import PaginaLogin from '../PaginaLogin/PaginaLogin.js';

import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import { useNavigation } from '../../contextos/Navegacao';

export default function BarraNavegacao(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { location } = useNavigation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const Autenticacao = new ServicoAutenticacao();
  const associadoLogado = Autenticacao.obterAssociadoLogado();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSair = () => {
    Autenticacao.removerAssociadoLocalStorage();
    props.onLogout();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: '100%' }}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <FaIcons.FaBars />
              </IconButton>
              <Typography variant="h6" noWrap>
                {location.title}
              </Typography>
            </Box>
            {associadoLogado?.id && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ padding: '2px' }}
                >
                  <Avatar
                    alt={associadoLogado.nome}
                    src={associadoLogado.imagem?.src}
                    style={{ width: '36px', height: '36px' }}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={openMenu}
                  onClose={handleClose}
                >
                  <MenuItem unselectable>
                    <Box
                      display="flex"
                      flexDirection="column"
                    >
                      <span style={{ fontSize: '13px', color: colors.grey[700] }}>
                        Usuário logado
                      </span>
                      <span>
                        {`${associadoLogado.nome} ${associadoLogado.sobrenome ? ` ${associadoLogado.sobrenome}` : ''}`}
                      </span>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                  <MenuItem onClick={handleSair}>Sair</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <FaIcons.FaChevronLeft /> : <FaIcons.FaChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {DadosBarraNavegacao.map(item => (
            <ListItem
              to={item.rota}
              key={item.texto}
              selected={item.key === location.key}
              component={Link}
              className={ classes.link }
            >
              <ListItemIcon>{ item.icone} </ListItemIcon>
              <ListItemText primary={ item.texto } />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/login" component={PaginaLogin}/>
          <Route exact path="/" component={Inicio}/>
          <Route path="/eventos" component={Eventos} />
          <Route path="/associados" component={Associados}/>
          <Route path="/atas" component={Atas}/>
          <Route path="/noticias" component={Noticias}/>
          <Route path="/classificados" component={Classificados}/>
          <Route path="/fotos" component={Fotos} />
          <Route path="/videos" component={Videos}/>
          <Route path="/site" component={Site}/>
        </Switch>
      </main>
    </div>
  );
}
