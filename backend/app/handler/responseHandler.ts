import { Response } from "express";

export const responseHandler: any = (res: Response, data: any) => {
    // TODO Gestire tipologie di status di response
    // 200 OK 
    // 201 Created: La richiesta è stata soddisfatta, restituendo la creazione di una nuova risorsa.
    // 202 Accepted: La richiesta di elaborazione è stata accettata ma non è ancora terminata.
    // 203 Non - Authoritative Information. Il server è un transforming proxy(ad es.un Web Accelerator) che ha ricevuto un 200 OK dalla sua origine, ma sta restituendo una versione modificata della risposta dell'origine.
    // 204 No Content. Il server ha processato con successo la richiesta e non restituirà nessun contenuto.
    // 205 Reset Content Il server ha processato con successo la richiesta e non restituirà nessun contenuto.Al contrario della risposta 204, questa richiede che il richiedente resetti il document view.
    // 206 Partial Content Il server sta consegnando solo parti della risorsa(byte serving) a causa del range di un header inviato dal client.Il range header è usato dai client HTTP per abilitare il ripristino di download interrotti, o per frazionare un download in molteplici flussi simultanei.
    // 207 Multi - Status In caso di risposte XML, quando più azioni possono essere richieste, i dettagli dei singoli stati sono dati nel corpo della risposta.Vedi WebDAV(RFC 4918) per le specifiche associate.
    // 208 Already Reported Utilizzato all'interno di un elemento di risposta DAV: propstat per evitare di enumerare ripetutamente i membri interni di più collegamenti alla stessa raccolta.
    return res.status(200).send(data);
};