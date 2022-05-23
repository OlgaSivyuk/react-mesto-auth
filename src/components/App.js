import { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip"
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import DeleteCardConfirmPopup from "./DeleteCardConfirmPopup";
import Footer from "./Footer";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardConfirmPopupOpen, setIsDeleteCardConfirmPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({}); 
  const [cards, setCards] = useState([]); 
  const [removeCard, setRemoveCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { // попробовать еще раз прописать данные пользователя и карточек в одном useEffect
      api.getProfile()
        .then(userData => {
          setCurrentUser({...userData,
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar
          })
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));
    }, []); 

    function handleUpdateUser ({name, about}){
      api.editProfile(name, about)
      .then(userData => {
        setCurrentUser({...userData,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar
        });
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

    function handleUpdateAvatar ({avatar}){
      api.editProfileAvatar(avatar)
      .then(userData => {
        setCurrentUser({...userData,
          
          userAvatar: userData.avatar
        });
        closeAllPopups();
      }).catch(err => console.error(`Ошибка...: ${err}`));
    };

  useEffect(() => {
    api.getUsersCards()
      .then((cardList) => {
        const usersCard = cardList.map((card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
            ownerId: card.owner._id
          };
        });
        setCards(usersCard);
      })
      .catch((err) => console.log(`Ошибка...: ${err}`));
  }, []);

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name, link)
    .then (newCard => {
      setCards([{
        name: newCard.name,
        link: newCard.link,
        likes: newCard.likes,
        cardId: newCard._id,
        ownerId: newCard.owner._id
      }, ...cards]);
      closeAllPopups();
    }).catch(err => console.error(`Ошибка...: ${err}`));
  };


  function handleCardLike(card) { 
    const isLiked = card.likes.some(user => user._id === currentUser._id); 

    if (isLiked){ 
      api.deleteLike(card.cardId)
      .then(newCard => { 
        setCards((state) => state.map((item) => {
          if(item.cardId === card.cardId){
            return{
              name: newCard.name,
              link: newCard.link,
              likes: newCard.likes,
              cardId: newCard._id,
              ownerId: newCard.owner._id
            }
          } else return item;
        }));
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
    } else {
        api.addLike(card.cardId)
          .then(newCard => { 
            setCards((stateCards) => stateCards.map((item) => {
              if(item.cardId === card.cardId){
                return{
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id
                }
              } else return item;
          }));
          })
          .catch(err => console.log(`Ошибка...: ${err}`))
      } 
   };

  function handleDeleteCard() {
    api.deleteCard(removeCard.cardId)
      .then(() => {
        setCards((stateCards) => stateCards.filter((item) => 
        item.cardId !== removeCard.cardId));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка...: ${err}`))
  };


  function handleRegister (email, password){
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleTrashbinClick(card){
    setIsDeleteCardConfirmPopupOpen(true)
    setRemoveCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleTrashbinClick}
            cards={cards}
          ></ProtectedRoute>
          <Route path="/signup"
            // handleRegister={handleRegister}
            >
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        {/* Модалка редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>

        {/* Модалка смены аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        {/* Модалка добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        {/* Модалка удаления карточки */}
        <DeleteCardConfirmPopup
          isOpen={isDeleteCardConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmCardDelete={handleDeleteCard}
        ></DeleteCardConfirmPopup>

        {/* Модалка открытия картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* Модалка с ответом о регистрации */}
        <InfoToolTip 
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
