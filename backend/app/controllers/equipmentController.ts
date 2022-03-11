import {NextFunction, Request, Response} from "express";
import {ErrorCode} from "../errors/errorCode";
import {ErrorException} from "../errors/errorException";
import {responseHandler} from "../handler/responseHandler";
import EquipmentClass from "../class/equipmentClass";
import EquipmentModel from "../models/equipmentModel";
import EquipmentProfileClass from "../class/equipmentProfileClass";
import {getParamsForLike} from "../utils/mongoDBUtils";
import {UserSession} from "../types/userSessionType";
import equipmentProfileModel from "../models/equipmentProfileModel";

class EquipmentController {
    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: { title: string, equipment: EquipmentClass[] } = req.body;

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            if (!body || !body.title || !body.equipment) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            // Creo prima gli Equipment Info
            const equipments = await EquipmentModel.insertMany(body.equipment);

            if (!equipments) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const equipmentProfile: EquipmentProfileClass = new EquipmentProfileClass();
            equipmentProfile.title = body.title;
            equipmentProfile.userId = userSession._id;

            // Recupero gli id della Equipments appena creati
            equipmentProfile.equipments = equipments.map(x => x._id);

            const equipmentProfileCreated = await equipmentProfileModel.create(equipmentProfile);

            if (!equipmentProfileCreated) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, equipmentProfileCreated);
        } catch (error) {
            next(error);
        }
    };

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: any = req.query as any;
            //@ts-ignore
            const userSession: UserSession = req.userSession;

            let _params = {
                ...{
                    userId: userSession._id
                },
                ...getParamsForLike(query)
            };

            const equipmentsProfiles = await equipmentProfileModel.find(_params).populate("equipments").populate("userId").exec();

            if (!equipmentsProfiles) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, equipmentsProfiles);
        } catch (error) {
            next(error);
        }
    };

    static findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            const equipmentProfile = await equipmentProfileModel.findOne(_params);

            if (!equipmentProfile) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, equipmentProfile);
        } catch (error) {
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            const equipmentProfile = await equipmentProfileModel.findOneAndDelete(_params, {
                useFindAndModify: false,
            });

            if (!equipmentProfile) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, equipmentProfile);
        } catch (error) {
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const body: any = req.body;

            // Campi obbligatori tutti
            if (!body || !body.title || !body.color || !body.description) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            let equipmentProfile = await equipmentProfileModel.findOneAndUpdate(_params, body, {
                useFindAndModify: false,
            });

            if (!equipmentProfile) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, equipmentProfile);
        } catch (error) {
            next(error);
        }
    };
}

export default EquipmentController;
