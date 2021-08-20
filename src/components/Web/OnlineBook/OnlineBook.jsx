import React, { useEffect, useState } from 'react';
import {Button, Calendar, Input,  Popconfirm, notification,  Tag, Spin } from 'antd';
import moment from 'moment';


import './OnlineBook.scss';
import TextArea from 'antd/lib/input/TextArea';


//api
import {addNewBookApi, getBooksHoursForDayApi} from '../../../api/books';
import { sendConfirmWhatsappMessageApi} from '../../../api/whatsappBot';

const { CheckableTag } = Tag;


const OnlineBook = ({setisVisible}) => {
        const [calendarIsVisible, setcalendarIsVisible] = useState(true);
        const [citasRegistro, setCitasRegistro] = useState([]);
        const [citasChecked, setCitasChecked] = useState(false);
        const [date, setDate] = useState();    
      return(
          <>
          {
              calendarIsVisible
              ?<CalendarForm setcalendar={setcalendarIsVisible} setDate={setDate} date={date} 
              setCitasRegistro={setCitasRegistro}
              setCitasChecked={setCitasChecked}
              /> 
              : citasChecked//Si ya encontró las horas que no trabaja
                    ?<BookForm date={date} setcalendar={setcalendarIsVisible} setisVisible={setisVisible} citasRegistro={citasRegistro}/>
                    :<div style={{textAlign:"center"}}><Spin  size="large" /></div>
            }
        </>
      );
    
}
 

function CalendarForm({setcalendar,setDate,date, setCitasRegistro, setCitasChecked}){//muestra el calendario
    

    const onchangeV=(value)=>{
        setDate(value);
    }

    const onClicDate = () =>{
        
        const getBookedHours = async() =>{
            const results = await getBooksHoursForDayApi(moment(date).format('MM/DD/YYYY'));
            setCitasRegistro(results.hours);
            setcalendar(false);
        
            
        }
        getBookedHours();
        setCitasChecked(true);
        
    }
    return (
        <>
        <div>
            <Calendar 
                fullscreen={false} 
                mode="month" 
                validRange={[moment().subtract(1, 'days'), moment().add(30, 'days') ]} 
                onSelect={value=>onchangeV(value)} 

                //Dias que no trabaja:
                disabledDate={(date) => {

                    if(moment(date).format('dddd')==="sábado"||moment(date).format('dddd')==="domingo"){//los diassabado y domingo no
                        return true;
                    }else{
                        return false;
                    }
                    
                  }}
            />
        </div>
            
        <div className="calendar-btn">
            <Button className="btnContinue" 
                onClick={onClicDate}
                disabled={moment(date).isBefore(moment().subtract(1, 'days')) ?true :false}//valida que la fecha no sea antes
                >
                Continuar
            </Button>
        </div>
        </>  
    );
}


function BookForm({date, setcalendar, setisVisible,citasRegistro}){

    
    const [name, setname] = useState("");
    const [whatsapp, setwhatsapp] = useState("");
    const [message, setmessage] = useState("");
    const [hourBooked, setHourBooked]=useState();

    const [checkedTag, setcheckedTag] = useState(false);
    const [cita, setcita] = useState([]);
    const [arrayAux, setarrayAux] = useState([]);
    const [intervalo, setintervalo] = useState(0);
    const [hourChose, sethourChose] = useState(false);

    useEffect(()=>{
        //Datos de la base de datos:
        const rangoI= moment('7:20','hh:mm');//Rango inicial
        const rangoF= moment('20:40','hh:mm');//Rango Final
        const incremento = 20;//minutos entre tiempo
       
        

        const intervalos = Math.ceil(rangoF.diff(rangoI, 'minutes')/incremento);//determinar cuantas citas puede haber
        setintervalo(intervalos);

        
        const hraCita = parseInt(moment(rangoI).format('hh'));
        const minCita = parseInt(moment(rangoI).format('mm'));

        for(var i=0; i<intervalos; i++){
            const x = Math.floor(((i*incremento)+minCita)/60);//variable de horas transcurridas
            const hrs = hraCita + x;//sacar hora
            const min = ((i*incremento)+minCita)-(60*x);//sacar minutos
            const citaString = `${hrs}:${min<10 ?`0${min}` :min}`;
            let bandera = false;
            
            for(var w=0; w<citasRegistro.length; w++){
                
                if(citasRegistro[w]===citaString){//Validacion de las horas no disponibles (FIJAS)
                    bandera= true;
                    break;
                }
            }

            if(moment(`${moment(date).format('DD MM YYYY')}, ${citaString}`, 'DD MM YYYY,hh:mm').isBefore(moment())){//Validar que no haya pasado ya la hora
                bandera=true;
            }
            if(bandera){
                setcita( 
                    arr => [...arr, {
                    hora: citaString,
                    check: false,
                    status: 'inactivo'
                }]);
            }else{
                setcita( 
                    arr => [...arr, {
                    hora: citaString,
                    check: false,
                    status: 'activo'
                }]);
    
            }
           
        }


    },[]);

    

    const confirm=()=>{//Validacion

        if(!hourChose){//Validar que escogió fecha
            notification['error']({
                message: "Por favor elija un horario disponible para su cita"
            });
        }else{
            if(name.length<10){//nombre 
                notification['error']({
                    message: "Por favor ingrese un nombre válido"
                });
            }else{
                if(whatsapp.length!==10){
                    notification['error']({
                        message: "Whatsapp incorrecto, por favor ingrese uno valido"
                    }); 
                }else{
                    if(message.length<5){
                        notification['error']({
                            message: "Por favor Describanos brevemente que servicio realizará"
                        });
                    }else{//Registro exitoso
                        const addBook  = async ()=>{
                            try{
                                const dateComplete = `${moment(date).format('DD MMMM YYYY')} ${hourBooked}`;
                                const result  = await addNewBookApi({
                                    name: name,
                                    whatsapp: whatsapp,
                                    date:  moment(dateComplete, 'DD MMMM YYYY HH:mm'),
                                    message: message
                                });//number, date, name
                                const resmessage = await sendConfirmWhatsappMessageApi(whatsapp,`${moment(date).format('DD MMMM YYYY')} a las ${hourBooked}`,name);
                                console.log(resmessage.message);
                                notification['success']({
                                    message: result.message});             
                            }catch{
                                notification['error']({
                                    message: "Ocurrió un error en su registro, intente despues"
                                });
                            }
                            
                            
                            
                            };
                            
                            addBook();

                            setisVisible(false);
                            setcalendar(true);
                             }
                }
            }
        }
        
        
        

    }

    const checkStatus=(hora)=>{
        
        let index;

        for(var i=0; i<intervalo;i++){
            
            if(cita[i].hora===hora){
                index = i;
            }
        }

        
        for(var j=0; j<intervalo;j++){
            if(j===index){
                sethourChose(true);
                setHourBooked(cita[j].hora);
                arrayAux[j]={
                    hora: cita[j].hora,
                    check: true,
                    status: cita[j].status
                }
            }else{
                arrayAux[j]={
                    hora: cita[j].hora,
                    check: false,
                    status: cita[j].status
                }
            }
        }
        
        setcita(arrayAux);
        setcheckedTag(!checkedTag);
    }
    
    
    return (
        <>
            <h3> Día:   <strong>{moment(date).format(' DD MMMM YYYY')}</strong> 
                 
                <Button 
                    className="onlineBook-btn"
                    onClick={()=>setcalendar(true)}>
                        Cambiar
                </Button>
                
            </h3>
            <br/>
            
            <h5>Seleccione la Hora:</h5>
            {
               checkedTag//Se usa para actualizar el checkableTag 

               ?( cita.map(cita=>(
                    cita.status==='activo'
                    ?(<CheckableTag
                        key={cita.hora} 
                        checked={cita.check} 
                        onChange={()=>checkStatus(cita.hora)} 
                        >
                            {cita.hora}
                        </CheckableTag> )
                    :   <Tag key={cita.hora}>{cita.hora}</Tag>
            )))

            : setcheckedTag(true)
               
            }
            
            
            <br/>
            <br/>
            <Input width={"50%"} placeholder="Nombre" value={name} onChange={e=>setname(e.target.value)}/>
            <br/>
            <br/>
            <Input  width={"50%"} type="number" placeholder="Whatsapp"value={whatsapp} onChange={e=>setwhatsapp(e.target.value)}/>
            <br/>
            <br/>
            <TextArea placeholder="Mensaje" value={message} onChange={e=>setmessage(e.target.value)}/>
            <br/>
            <br/>
                
            <Popconfirm
                title="¿Está seguro de su cita?"
                onConfirm={confirm}
                okText="Si"
                cancelText="No"
            >
                <Button
                    type="primary"
                    style={{width:"100%"}}
                >
                    Agendar Cita
                </Button>
            </Popconfirm>   
        </>
    )
}


export default OnlineBook;