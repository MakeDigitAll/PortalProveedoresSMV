create database "smv_Proveedores";

\c smv_Proveedores;

create table "providersProfile" ( --checar los not null acorde a la documentacion  
    "id" serial primary key,
    "providerId" int not null,
    "providerName" varchar(100) not null,
    "socialReason" varchar(100) not null,
    "discountSale" int DEFAULT 0,
    "referenceCode" varchar(11) DEFAULT LPAD(TO_HEX(FLOOR(RANDOM() * 10000000000)::bigint), 10, '0'),
    "address" varchar(100),
    "col" varchar(100),
    "rfc" varchar(100) not null,
    "city" varchar(100),
    "state" varchar(100),
    "postalCode" varchar(100),
    "country" varchar(100),
    "contact" varchar(200) not null,
    "phone" varchar(100),
    "email" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);

create table "UsersProfile"
(
    "id" serial primary key,
    "profileId" int not null,
    "profileName" varchar(100) not null,
    "address" varchar(100),
    "col" varchar(100),
    "city" varchar(100),
    "state" varchar(100),
    "postalCode" varchar(100),
    "country" varchar(100),
    "contact" varchar(200),
    "phone" varchar(100) not null,
    "email" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);

-- me fui a comer pero aqui estaba haciendo el listado de proveedores donde se mostrará el nombre de la empresa, la razon social, el rfc, la ciudad, el estado, el pais, los productos y las accieones (CRUD

-- el nombre de usuario para iniciar sesion es el correo electronico de providersProfile
create table "userAuth" (
    "id" serial primary key,
    "userName" varchar(100) not null unique,
    "password" varchar(100) not null,
    "isPasswordModified" boolean default false,
    "isVerified" boolean default false,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "userImages"
(
    "id" serial primary key,
    "userId" int not null,
    "image" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);



create table "Permissions" (
    "id" serial primary key,
    "userId" int not null unique,
    "permission" varchar(100) not null,
    "reference" varchar(11),
    "estatus" varchar(100) not null default 'Activo',
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "verifyToken" (
    "id" serial primary key,
    "userId" int not null,
    "token" varchar(200) not null,
    "expireTime" timestamp not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "pvProducts" (
    "id" serial primary key,
    "providerId" int not null,
    "productName" varchar(100) not null,
    "manofacturerCode" varchar(100) not null,
    "companyCode" varchar(100),
    "brand" varchar(100),
    "model" varchar(100),
    "price1" float,
    "price2" float,
    "price3" float,
    "price4" float,
    "rate1" float,
    "rate2" float,
    "rate3" float,
    "satProductCode" varchar(100) not null,
    "satUnitCode" varchar(100) not null,
    "unitMeasurement" varchar(100),
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "pvProductsImages" (
    "id" serial primary key,
    "productId" int not null,
    "image1" BYTEA,
    "image2" BYTEA,
    "image3" BYTEA,
    "image4" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "technicalSheetProducts"
(
    "id" serial primary key,
    "productId" int not null,
    "tecnicalSheet" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);


-- Al listar productos, ademas de las funciones CRUD, se agregaran acciones para facilitar la gestion de estos, una de estas funciones es poder poder gestionar la disponibilidad de los productos
-- Esta función se realizara con un boton que se llamara "Gestionar disponibilidad" y mostrara una tabla con los productos, la cantidad disponible, la cantidad minima y la cantidad maxima
-- Se dispondra de tres categorias de disponibilidad de productos, la primera es "Disponible", la segunda es "Agotado" y la tercera es "Por agotarse" y seran representadas con colores para facilitar su identificacion (verde, rojo y amarillo)
-- para esto se creara una tabla que se llamara providerProductsAvailability, en esta tabla se mostrara el nombre del producto, la cantidad disponible, la cantidad minima y la cantidad maxima


create table "ProductsAvailability" (
    "productId" int not null unique,
    "productStock" int not null,
    "productMin" int not null,
    "productMax" int not null,
    "availabilityCat" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);


--tal vez se elimine esta tabla y se agregue el campo "estatus" a la tabla providerOrders

create table "pvOrders" (
    "id" serial primary key unique not null,
    "folio" INTEGER not null unique,
    "providerId" int,
    "orderDate" timestamp,
    "estimatedDeliveryDate" timestamp,
    "orderType" varchar(100),
    "facture" varchar(50) DEFAULT CONCAT('C-', LPAD(TO_HEX(FLOOR(RANDOM() * 10000000000)::bigint), 10, '0')) UNIQUE,
    "orderStatus" varchar(100) not null default 'Nuevo',
    "orderData" varchar(100),
    "deliveryData" varchar(100) not null,
    "status" varchar(100) not null default 'Nuevo',
    "paymentMethod" varchar(100),
    "productsOrder" JSONB,
    "amountPaid" float,
    "amountPending" float,
    "discount" float,
    "subtotal" float,
    "total" float,
    "comments" varchar(100),
    "fulfilled" boolean default false,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

CREATE SEQUENCE folio_seq
    START WITH 10000
    INCREMENT BY 1
    NO MAXVALUE
    NO CYCLE;

ALTER TABLE "pvOrders"
    ALTER COLUMN "folio"
    SET DEFAULT nextval('folio_seq'::regclass);

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER
    AS $$
    BEGIN
        IF NEW."isDeleted" <> OLD."isDeleted" THEN
            UPDATE "userAuth"
            SET "isDeleted" = NEW."isDeleted", "updated_At" = now()
            WHERE "id" = OLD."providerId";
            END IF;
            RETURN NEW;
    END;
    $$
    LANGUAGE plpgsql;

CREATE TRIGGER update_isDeleted_userAuth_profileProv
    AFTER UPDATE
    ON "providersProfile"
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();


------------------------------------------------------------------------------- funcion para actualizar la tabla providersLI, cuando se actualice la tabla providersProfile -----------------------------------------------------------------------------------------------------------------

alter table "providersProfile"
add constraint fk_profile_userAuth foreign key ("providerId") references "userAuth" ("id");

alter table "UsersProfile"
add constraint fk_profile_userAuth foreign key ("profileId") references "userAuth" ("id");

alter table "pvProducts"
add constraint fk_prod_profile foreign key ("providerId") references "providersProfile" ("id");

alter table "Permissions"
add constraint fk_permissions_provider foreign key ("userId") references "userAuth" ("id");

alter table "verifyToken"
add constraint fk_verify_provider foreign key ("userId") references "userAuth" ("id");

alter table "userImages"
add constraint fk_userImages_userAuth foreign key ("userId") references "userAuth" ("id");

alter table "pvProducts"
add constraint fk_prod_provider foreign key ("providerId") references "providersProfile" ("id");

alter table "pvProductsImages"
add constraint fk_prodImg_prod foreign key ("productId") references "pvProducts" ("id");

alter table "technicalSheetProducts"
add constraint fk_tecSheet_prod foreign key ("productId") references "pvProducts" ("id");

------------------------------------------------------------------------------------   Llaves foraneas   ------------------------------------------------------------------------------------------------------------