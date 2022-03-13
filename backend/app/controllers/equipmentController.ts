import {NextFunction, Request, Response} from "express";
import {ErrorCode} from "../errors/errorCode";
import {ErrorException} from "../errors/errorException";
import {responseHandler} from "../handler/responseHandler";
import EquipmentClass from "../class/equipmentClass";
import EquipmentModel from "../models/equipmentModel";
import EquipmentProfileClass from "../class/equipmentProfileClass";
import {getParamsForLike} from "../utils/mongoDBUtils";
import {UserSession} from "../types/userSessionType";
import EquipmentProfileModel from "../models/equipmentProfileModel";

class EquipmentController {
    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: { title: string, equipments: EquipmentClass[] } = req.body;

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            if (!body || !body.title || !body.equipments) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            // Creo prima gli Equipment Info
            const equipments = await EquipmentModel.insertMany(body.equipments);

            if (!equipments) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const equipmentProfile: EquipmentProfileClass = new EquipmentProfileClass();
            equipmentProfile.title = body.title;
            equipmentProfile.userId = userSession._id;

            // Recupero gli id della Equipments appena creati
            equipmentProfile.equipments = equipments.map(x => x._id);

            const equipmentProfileCreated = await EquipmentProfileModel.create(equipmentProfile);

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

            const equipmentsProfiles = await EquipmentProfileModel.find(_params).populate("equipments").populate("userId").exec();

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

            const equipmentProfile = await EquipmentProfileModel.findOne(_params).populate("equipments").exec();

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

            const equipmentProfile = await EquipmentProfileModel.findOneAndDelete(_params, {
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
            if (!body || !body.title || !body.equipments) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            let _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            const checkEquipmentProfile = await EquipmentProfileModel.findOne(_params).populate("equipments").exec();

            if (checkEquipmentProfile) {
                let equipmentsMap = checkEquipmentProfile?.equipments?.map((x: any) => x._id);

                // Elimino
                const deletedEquipments = await EquipmentModel.deleteMany({
                    _id: {
                        $in: equipmentsMap
                    }
                });

                if (!deletedEquipments) {
                    throw new ErrorException(ErrorCode.BadRequest);
                }

                // Ricreo equipments
                const newEquipments = await EquipmentModel.insertMany(body.equipments);

                if (!newEquipments) {
                    throw new ErrorException(ErrorCode.BadRequest);
                }

                let equipmentProfile: EquipmentProfileClass = new EquipmentProfileClass();
                equipmentProfile.title = body.title;
                equipmentProfile.userId = userSession._id;

                // Recupero gli id della Equipments appena creati
                equipmentProfile.equipments = newEquipments.map(x => x._id);

                let updEquip = await EquipmentProfileModel.findOneAndUpdate(_params, equipmentProfile, {
                    useFindAndModify: false,
                });

                if (!updEquip) {
                    throw new ErrorException(ErrorCode.BadRequest);
                }

                responseHandler(res, equipmentProfile);
            } else {
                throw new ErrorException(ErrorCode.BadRequest);
            }
        } catch (error) {
            next(error);
        }
    };
}

export default EquipmentController;
